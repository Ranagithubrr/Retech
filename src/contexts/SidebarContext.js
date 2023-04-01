import { createContext, useState } from "react";

export const SidebarContext = createContext();


export const SidebarContextProvider = ({ children }) => {
    const [sidebar, setSidebar] = useState('hidden');
    const [showclearFilter, setShowClearFilter] = useState(false);
    const [filter, setFilter] = useState('');
    return <SidebarContext.Provider value={{ sidebar, setSidebar, filter, setFilter, showclearFilter, setShowClearFilter }}>
        {children}
    </SidebarContext.Provider>
}