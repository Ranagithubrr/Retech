import { onAuthStateChanged } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";
import { createContext, useEffect, useState } from "react";
import { auth, db } from "../Firebase-config/Firebase-config";

export const MobileContext = createContext();

export const MobileContextProvider = ({ children }) => {
    const [mobilelists, setMobiles] = useState({});
    const [filteredmobilelists, setFilteredMobiles] = useState({});
    const [loading, setLoading] = useState(true);

    const fetchmobiles = async () => {

        await getDocs(collection(db, "mobiles"))
            .then((querySnapshot) => {
                const mobiledatadb = querySnapshot.docs
                    .map((doc) => ({ ...doc.data(), id: doc.id }));
                setMobiles(mobiledatadb);
                setFilteredMobiles(mobiledatadb);
                setLoading(true);
                // console.log(mobilelists);
            })
            .catch((err) => {
                console.log(err);
            })
    };

    useEffect(() => {
        fetchmobiles();
    }, [])
    useEffect(() => {
        // console.log(mobilelists);
    }, [mobilelists])
    return (
        <MobileContext.Provider value={{ mobilelists, loading, setMobiles, filteredmobilelists, setFilteredMobiles }}>
            {children}
        </MobileContext.Provider>
    )
}