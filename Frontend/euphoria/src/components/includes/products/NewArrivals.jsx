// import React, { useEffect, useState} from 'react';
// import Rectangle from '../../general/Rectangle';
// import Heading from '../../general/Heading';

// function NewArrivals() {
//     const [categories, setCategories] = useState([]);

//     useEffect(() => {
//         fetch('http://localhost:8000/api/v1/category/')
//             .then(response => response.json())
//             .then(data => {
//                 const filteredCategories = data.data.filter(category => category.id >= 2 && category.id <= 8);
//                 setCategories(filteredCategories)
//             })
//             .catch(error => console.error('Error fetching categories:', error));
//     },[]);

//     return (
//         <div className='wrapper'>
//             <div className='flex items-center space-x-5 mb-10'>
//                 <Rectangle />
//                 <Heading text="New Arrival" />
//             </div>
//             <div className='flex'>
//                 {categories.map(category => (
//                     <div key={category.id}>
//                         <img src={category.image} alt={category.name} />
//                         <p>{category.name}</p>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     )
// }

// export default NewArrivals


import React, { useEffect, useState } from 'react';
import Rectangle from '../../general/Rectangle';
import Heading from '../../general/Heading';

function NewArrivals() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8000/api/v1/category/')
            .then(response => response.json())
            .then(data => {
                console.log('Fetched Data:', data.data); // Log to see if data is correct
                const filteredCategories = data.data.filter(category => category.id >= 2 && category.id <= 8);
                console.log('Filtered Categories:', filteredCategories); // Log to ensure filtering works
                setCategories(filteredCategories);
            })
            .catch(error => console.error('Error fetching categories:', error));
    }, []);

    return (
        <div className='wrapper'>
            <div className='flex items-center space-x-5 mb-10'>
                <Rectangle />
                <Heading text="New Arrival" />
            </div>
            <div className='flex space-x-4'>
                {categories.map(category => (
                    <div key={category.id} className="category-item">
                        <img 
                            src={category.image} 
                            alt={category.name} 
                            className="w-full h-auto"
                        />
                        <p className="text-center mt-2">{category.name}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default NewArrivals;
