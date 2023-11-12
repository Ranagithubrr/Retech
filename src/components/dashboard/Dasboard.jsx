import React, { useContext, useEffect, useState } from 'react';
import { GrFormClose } from 'react-icons/gr';
import { FcClearFilters, FcFilledFilter } from 'react-icons/fc';
import { MobileContext } from '../../contexts/MobileContext';
import Mobile from '../mobiles/Mobile';
import './dashboard.css';
import { SidebarContext } from '../../contexts/SidebarContext';


const Dasboard = () => {
    const { mobilelists, filteredmobilelists, setFilteredMobiles } = useContext(MobileContext);
    // const [showclearFilter, setShowClearFilter] = useState(false);
    const { filter, setFilter, showclearFilter, setShowClearFilter } = useContext(SidebarContext);

    let filteredItems = [];

    const [FilterdParams, setFilterdParams] = useState({
        brand: '',
        price: '',
        uses: ''
    })
    // console.log(mobilelists);

    useEffect(() => {
        // console.log(filteredmobilelists);
    }, [filteredmobilelists]);
    const FilterItems = () => {
        // setMobiles([])
        // console.log(mobilelists);
        // console.log(FilterdParams);
        setFilter('');
        console.log(FilterdParams);
        if (FilterdParams.brand === '' && FilterdParams.price === '' && FilterdParams.uses === '') {
            setShowClearFilter(false);
            console.log('no filter');
            setFilteredMobiles(mobilelists);
            console.log(filteredmobilelists);
            console.log(mobilelists);
        }
        // filtering with only brand name
        else if (FilterdParams.brand !== '' && FilterdParams.price === '' && FilterdParams.uses === '') {
            setShowClearFilter(true)
            mobilelists.map((ele) => {
                if (ele.mobileDetail.brand === FilterdParams.brand) {
                    console.log(ele);
                    if (ele.mobileDetail.status === 'active') {
                        filteredItems.push(ele);
                    }
                };
                return (null)
            });
            setFilteredMobiles(filteredItems)
            console.log('main mobile list is:', mobilelists);

        }
        // filtering with only price
        else if (FilterdParams.brand === '' && FilterdParams.price !== '' && FilterdParams.uses === '') {
            setShowClearFilter(true)
            console.log('filtering with only price');
            mobilelists.map((ele) => {
                if (FilterdParams.price === '10000') {
                    if (ele.mobileDetail.price < 10000) {
                        console.log(ele);
                        if (ele.mobileDetail.status === 'active') {
                            filteredItems.push(ele);
                        }
                        
                    }
                    

                }
                else if (FilterdParams.price === '10000-15000') {
                    if (ele.mobileDetail.price >= 10000 && ele.mobileDetail.price <= 15000) {
                        console.log(ele);
                        if (ele.mobileDetail.status === 'active') {
                            filteredItems.push(ele);
                        }
                    }
                }
                else if (FilterdParams.price === '15000-20000') {
                    if (ele.mobileDetail.price >= 15000 && ele.mobileDetail.price <= 20000) {
                        console.log(ele);
                        if (ele.mobileDetail.status === 'active') {
                            filteredItems.push(ele);
                        }
                    }
                }
                else if (FilterdParams.price === '20000-25000') {
                    if (ele.mobileDetail.price >= 20000 && ele.mobileDetail.price <= 25000) {
                        console.log(ele);
                        if (ele.mobileDetail.status === 'active') {
                            filteredItems.push(ele);
                        }
                    }
                }
                else if (FilterdParams.price === '25000-50000') {
                    if (ele.mobileDetail.price >= 25000 && ele.mobileDetail.price <= 50000) {
                        console.log(ele);
                        if (ele.mobileDetail.status === 'active') {
                            filteredItems.push(ele);
                        }
                    }
                }
                else if (FilterdParams.price === '50000+') {
                    if (ele.mobileDetail.price >= 50000) {
                        console.log(ele);
                        if (ele.mobileDetail.status === 'active') {
                            filteredItems.push(ele);
                        }
                    }
                }
                return(null)
            });
            setFilteredMobiles(filteredItems)
            console.log('main mobile list is:', mobilelists);
        }
        // filtering with only usage
        else if (FilterdParams.brand === '' && FilterdParams.price === '' && FilterdParams.uses !== '') {
            setShowClearFilter(true)
            console.log('filtering with only price');
            mobilelists.map((ele) => {
                if (ele.mobileDetail.userange === FilterdParams.uses) {
                    if (ele.mobileDetail.status === 'active') {
                        filteredItems.push(ele);
                    }
                }
                return null;
            });
            setFilteredMobiles(filteredItems)
            console.log('main mobile list is:', mobilelists);
        }
        // filtering with brand and price 
        else if (FilterdParams.brand !== '' && FilterdParams.price !== '' && FilterdParams.uses === '') {
            setShowClearFilter(true)
            console.log('calling from brand and price');
            mobilelists.map((ele) => {
                if (ele.mobileDetail.brand === FilterdParams.brand) {
                    if (FilterdParams.price === '10000') {
                        if (ele.mobileDetail.price < 10000) {
                            console.log(ele);
                            if (ele.mobileDetail.status === 'active') {
                                filteredItems.push(ele);
                            }
                        }

                    }
                    else if (FilterdParams.price === '10000-15000') {
                        if (ele.mobileDetail.price >= 10000 && ele.mobileDetail.price <= 15000) {
                            console.log(ele);
                            if (ele.mobileDetail.status === 'active') {
                                filteredItems.push(ele);
                            }
                        }
                    }
                    else if (FilterdParams.price === '15000-20000') {
                        if (ele.mobileDetail.price >= 15000 && ele.mobileDetail.price <= 20000) {
                            console.log(ele);
                            if (ele.mobileDetail.status === 'active') {
                                filteredItems.push(ele);
                            }
                        }
                    }
                    else if (FilterdParams.price === '20000-25000') {
                        if (ele.mobileDetail.price >= 20000 && ele.mobileDetail.price <= 25000) {
                            console.log(ele);
                            if (ele.mobileDetail.status === 'active') {
                                filteredItems.push(ele);
                            }
                        }
                    }
                    else if (FilterdParams.price === '25000-50000') {
                        if (ele.mobileDetail.price >= 25000 && ele.mobileDetail.price <= 50000) {
                            console.log(ele);
                            if (ele.mobileDetail.status === 'active') {
                                filteredItems.push(ele);
                            }
                        }
                    } else if (FilterdParams.price === '50000+') {
                        if (ele.mobileDetail.price >= 50000) {
                            console.log(ele);
                            if (ele.mobileDetail.status === 'active') {
                                filteredItems.push(ele);
                            }
                        }
                    }
                };
                return null;
            });
            setFilteredMobiles(filteredItems)
            console.log('main mobile list is:', mobilelists);
        }
        // filtering with brand and uses 
        else if (FilterdParams.brand !== '' && FilterdParams.price === '' && FilterdParams.uses !== '') {
            setShowClearFilter(true)
            console.log('calling from brand and price');
            mobilelists.map((ele) => {
                if (ele.mobileDetail.brand === FilterdParams.brand) {
                    if (ele.mobileDetail.userange === FilterdParams.uses) {
                        if (ele.mobileDetail.status === 'active') {
                            filteredItems.push(ele);
                        }
                    }
                };
                return null;
            });
            setFilteredMobiles(filteredItems)
            console.log('main mobile list is:', mobilelists);
        }
        // filtering with price and uses 
        else if (FilterdParams.brand === '' && FilterdParams.price !== '' && FilterdParams.uses !== '') {
            setShowClearFilter(true)
            console.log('calling from brand and price');
            mobilelists.map((ele) => {
                if (ele.mobileDetail.userange === FilterdParams.uses) {
                    if (FilterdParams.price === '10000') {
                        if (ele.mobileDetail.price < 10000) {
                            console.log(ele);
                            if (ele.mobileDetail.status === 'active') {
                                filteredItems.push(ele);
                            }
                        }

                    }
                    else if (FilterdParams.price === '10000-15000') {
                        if (ele.mobileDetail.price >= 10000 && ele.mobileDetail.price <= 15000) {
                            console.log(ele);
                            if (ele.mobileDetail.status === 'active') {
                                filteredItems.push(ele);
                            }
                        }
                    }
                    else if (FilterdParams.price === '15000-20000') {
                        if (ele.mobileDetail.price >= 15000 && ele.mobileDetail.price <= 20000) {
                            console.log(ele);
                            if (ele.mobileDetail.status === 'active') {
                                filteredItems.push(ele);
                            }
                        }
                    }
                    else if (FilterdParams.price === '20000-25000') {
                        if (ele.mobileDetail.price >= 20000 && ele.mobileDetail.price <= 25000) {
                            console.log(ele);
                            if (ele.mobileDetail.status === 'active') {
                                filteredItems.push(ele);
                            }
                        }
                    }
                    else if (FilterdParams.price === '25000-50000') {
                        if (ele.mobileDetail.price >= 25000 && ele.mobileDetail.price <= 50000) {
                            console.log(ele);
                            if (ele.mobileDetail.status === 'active') {
                                filteredItems.push(ele);
                            }
                        }
                    }
                    else if (FilterdParams.price === '50000+') {
                        if (ele.mobileDetail.price >= 50000) {
                            console.log(ele);
                            if (ele.mobileDetail.status === 'active') {
                                filteredItems.push(ele);
                            }
                        }
                    }
                }
                return(null)
            });
            setFilteredMobiles(filteredItems)
            console.log('main mobile list is:', mobilelists);
        }
        // filtering with brand, price and uses 
        else if (FilterdParams.brand !== '' && FilterdParams.price !== '' && FilterdParams.uses !== '') {
            setShowClearFilter(true)
            console.log('calling from brand and price');
            mobilelists.map((ele) => {
                if (ele.mobileDetail.brand === FilterdParams.brand) {
                    if (ele.mobileDetail.userange === FilterdParams.uses) {
                        if (FilterdParams.price === '10000') {
                            if (ele.mobileDetail.price < 10000) {
                                console.log(ele);
                                if (ele.mobileDetail.status === 'active') {
                                    filteredItems.push(ele);
                                }
                            }

                        }
                        else if (FilterdParams.price === '10000-15000') {
                            if (ele.mobileDetail.price >= 10000 && ele.mobileDetail.price <= 15000) {
                                console.log(ele);
                                if (ele.mobileDetail.status === 'active') {
                                    filteredItems.push(ele);
                                }
                            }
                        }
                        else if (FilterdParams.price === '15000-20000') {
                            if (ele.mobileDetail.price >= 15000 && ele.mobileDetail.price <= 20000) {
                                console.log(ele);
                                if (ele.mobileDetail.status === 'active') {
                                    filteredItems.push(ele);
                                }
                            }
                        }
                        else if (FilterdParams.price === '20000-25000') {
                            if (ele.mobileDetail.price >= 20000 && ele.mobileDetail.price <= 25000) {
                                console.log(ele);
                                if (ele.mobileDetail.status === 'active') {
                                    filteredItems.push(ele);
                                }
                            }
                        }
                        else if (FilterdParams.price === '25000-50000') {
                            if (ele.mobileDetail.price >= 25000 && ele.mobileDetail.price <= 50000) {
                                console.log(ele);
                                if (ele.mobileDetail.status === 'active') {
                                    filteredItems.push(ele);
                                }
                            }
                        }
                        else if (FilterdParams.price === '50000+') {
                            if (ele.mobileDetail.price >= 50000) {
                                console.log(ele);
                                if (ele.mobileDetail.status === 'active') {
                                    filteredItems.push(ele);
                                }
                            }
                        }
                    }
                }
                return(null)
            });
            setFilteredMobiles(filteredItems)
            console.log('main mobile list is:', mobilelists);
        }
        // ends
        else {
            console.log('filter not found');
        }
        console.log(filteredItems.length);
    }

    const ClearFilter = () => {
        setFilteredMobiles(mobilelists);
        setFilter('');
        setFilterdParams({
            brand: '',
            price: '',
            uses: ''
        });
        setShowClearFilter(false)
    }
    useEffect(() => {
        ClearFilter();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className='mainDashboard'>
            {showclearFilter && <div className='mainClearFilter' onClick={ClearFilter}><FcClearFilters /></div>}
            <div className="mainFilterIcon" onClick={() => setFilter('showFilter')}><FcFilledFilter /></div>
            <div className={`filterarea ${filter}`}>
                <span className='closeIcon' onClick={() => setFilter('')}><GrFormClose /></span>
                <h4>Filter :</h4>
                <div>
                    <span>Brand</span>
                    <select name="mobiles" id="" onChange={(e) => setFilterdParams({ ...FilterdParams, brand: e.target.value })} value={FilterdParams.brand}>
                        <option value=''>Select Brand</option>
                        <option value="iphone">I-Phone</option>
                        <option value="xiaomi">Xiaomi</option>
                        <option value="samsung">Samsung</option>
                        <option value="oppo">Oppo</option>
                        <option value="realme">Realme</option>
                        <option value="symphoney">symphoney</option>
                        <option value="techno">Techno</option>
                        <option value="itel">Itel</option>
                        <option value="infinix">Infinix</option>
                        <option value="walton">Walton</option>
                        <option value="motorola">Motorola</option>
                        <option value="nokia">Nokia</option>
                        <option value="oneplus">Oneplus</option>
                    </select>
                </div>
                <div className="priceBox">
                    <span>Price</span>
                    <select name="prices" id="" onChange={(e) => setFilterdParams({ ...FilterdParams, price: e.target.value })} value={FilterdParams.price}>
                        <option value=''>Select Price</option>
                        <option value="10000"> under ৳10000</option>
                        <option value="10000-15000"> Between ৳10000-৳15000</option>
                        <option value="15000-20000"> Between ৳15000-৳20000</option>
                        <option value="20000-25000"> Between ৳20000-৳25000</option>
                        <option value="25000-50000"> Between ৳25000-৳50000</option>
                        <option value="50000+"> Over ৳50000 +</option>
                    </select>
                </div>
                <div className="usetime">
                    <span>Uses</span>
                    <select name="usetime" id="" onChange={(e) => setFilterdParams({ ...FilterdParams, uses: e.target.value })} value={FilterdParams.uses}>
                        <option value=''>Select Use Range</option>
                        <option value="1 Month Only"> under 1 Month</option>
                        <option value="Between 1-6 Month Only"> Between 1-6 Month</option>
                        <option value="Between 6-12 Month Only"> Between 6 Month - 1 Year</option>
                        <option value="Over 1 Year Only">1 Year +</option>
                    </select>
                    <button className='filterBtn' onClick={FilterItems}>Filter Items</button>
                    {showclearFilter && <button className='clearFilter' onClick={ClearFilter}>Clear Filter</button>}
                    {showclearFilter && <button className='clearFilterForMobile' onClick={ClearFilter}><FcClearFilters /></button>}
                </div>
            </div>
            <Mobile />

        </div>
    );
};

export default Dasboard;