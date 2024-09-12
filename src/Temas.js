import React, { useState, useEffect } from "react";
import { CSSTransition } from "react-transition-group";
import courseContent from './jsons/temas.json'; // Asegúrate que este archivo JSON tiene la estructura que hemos mencionado
import './App.css'; // Import your custom CSS for animations

const TreeItem = ({ item, activeItem, onItemSelect, searchTerm }) => {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        if (
            searchTerm &&
            (item.label.toLowerCase().includes(searchTerm) ||
                (item.children && item.children.some((child) => child.label.toLowerCase().includes(searchTerm))))
        ) {
            setIsOpen(true);
        }
    }, [searchTerm, item]);

    const isSelected = item.id === activeItem?.id;
    const isChildSelected = item.children && item.children.some((child) => child.id === activeItem?.id);

    const toggleOpen = () => {
        setIsOpen(!isOpen);
    };

    return (
        <li className="mb-2">
            <div
                onClick={() => {
                    if (item.children) {
                        toggleOpen();
                    } else {
                        onItemSelect(item);
                    }
                }}
                className={`cursor-pointer p-2 rounded-md flex justify-between ${
                    isSelected || isChildSelected
                        ? "bg-blue-300 font-bold"
                        : "hover:bg-gray-300"
                }`}
            >
                <span>{item.label}</span>
                {item.children && <span>{isOpen ? "-" : "+"}</span>}
            </div>

            <CSSTransition
                in={isOpen}
                timeout={300}
                classNames="tree-item"
                unmountOnExit
            >
                <ul className="ml-4 mt-2">
                    {item.children &&
                        item.children.map((child) => (
                            <TreeItem
                                key={child.id}
                                item={child}
                                activeItem={activeItem}
                                onItemSelect={onItemSelect}
                                searchTerm={searchTerm}
                            />
                        ))}
                </ul>
            </CSSTransition>
        </li>
    );
};

const CourseTree = ({ filteredContent, activeItem, onItemSelect, searchTerm, isFullWidth }) => {
    if (filteredContent.length === 0) {
        return <p>No matching course content available</p>;
    }

    return (
        <div className={`${isFullWidth ? 'w-full' : 'w-1/4'} bg-gray-200 p-4 rounded-md`}>
            <ul>
                {filteredContent.map((item) => (
                    <TreeItem
                        key={item.id}
                        item={item}
                        activeItem={activeItem}
                        onItemSelect={onItemSelect}
                        searchTerm={searchTerm}
                    />
                ))}
            </ul>
        </div>
    );
};

const InfoComponent = ({ activeItem }) => {
    const [ComponentToRender, setComponentToRender] = useState(null);

    useEffect(() => {
        const loadComponent = async () => {
            if (activeItem && activeItem.path) {
                try {
                    const { default: LoadedComponent } = await import(`${activeItem.path}`);
                    setComponentToRender(() => LoadedComponent);
                } catch (error) {
                    console.error("Error loading component:", error);
                    setComponentToRender(null);
                }
            } else {
                setComponentToRender(null);
            }
        };

        loadComponent();
    }, [activeItem]);

    if (!activeItem) {
        return (
            <div className="w-3/4 bg-white p-4 rounded-md shadow-md">
                <p>Elija el módulo que desee y luego el tema</p>
            </div>
        );
    }

    return (
        <div className="w-3/4 bg-white p-4 rounded-md shadow-md">
            {ComponentToRender ? <ComponentToRender /> : <p>Componente no disponible para este tema.</p>}
        </div>
    );
};

const App = () => {
    const [activeItem, setActiveItem] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredContent, setFilteredContent] = useState(courseContent);

    const handleItemSelect = (item) => {
        console.log("Selected item:", item);
        setActiveItem(item);
    };

    const handleSearchChange = (e) => {
        const searchTerm = e.target.value.toLowerCase();
        setSearchTerm(searchTerm);

        if (searchTerm) {
            const filtered = courseContent
                .map(item => filterItemBySearch(item, searchTerm))
                .filter(Boolean);
            setFilteredContent(filtered);
        } else {
            setFilteredContent(courseContent);
        }
    };

    const filterItemBySearch = (item, searchTerm) => {
        if (item.label.toLowerCase().includes(searchTerm)) {
            return item;
        }

        if (item.children) {
            const filteredChildren = item.children
                .map(child => filterItemBySearch(child, searchTerm))
                .filter(Boolean);

            if (filteredChildren.length > 0) {
                return { ...item, children: filteredChildren };
            }
        }

        return null;
    };

    return (
        <div>
            <div className="flex justify-center mb-4">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    placeholder="Buscar por tema"
                    className="p-2 border border-gray-300 rounded-md w-full"
                />
            </div>
            <div className={`max-w-6xl mx-auto flex ${!activeItem ? 'w-full' : 'space-x-4'}`}>
                <CourseTree
                    filteredContent={filteredContent}
                    activeItem={activeItem}
                    onItemSelect={handleItemSelect}
                    searchTerm={searchTerm}
                    isFullWidth={!activeItem}
                />
                {activeItem && <InfoComponent activeItem={activeItem} />}
            </div>
        </div>
    );
};

export default App;