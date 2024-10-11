// // MapCursor.jsx

// import React, { useState, useRef } from 'react';
// import './MapCursor.scss';

// const MapCursor = () => {
//   const [areas, setAreas] = useState([
//     // { id: 1, shape: 'circle', coords: '637,1060,25', href: 'http://localhost:3000/hostels/65ad02475fb2597de896aad9', alt: 'G1 Hostel' },
//     // { id: 2, shape: 'circle', coords: '702,1066,20', href: 'http://localhost:3000/hostels/65acfe7a57f79b7fd4d85a66', alt: 'G2 Hostel' },
//     // // Add more areas as needed
//   ]);

//   const [newArea, setNewArea] = useState({
//     shape: 'circle',
//     coords: '',
//     href: '',
//     alt: '',
//   });

//   const [selectionCircle, setSelectionCircle] = useState(null);
//   const [circleRadius, setCircleRadius] = useState(25); // Default radius
//   const [mode, setMode] = useState('normal'); // 'normal' or 'editing'

//   const imageRef = useRef(null);

//   const handleAddArea = () => {
//     if (selectionCircle) {
//       setAreas([...areas, { ...newArea, id: areas.length + 1, coords: `${selectionCircle.centerX},${selectionCircle.centerY},${circleRadius}` }]);
//       setNewArea({
//         shape: 'circle',
//         coords: '',
//         href: '',
//         alt: '',
//       });
//       setSelectionCircle(null); // Clear the selection circle after adding an area
//     }
//   };
//   const handleImageClick = (e) => {
//     if (mode === 'editing') {
//       const rect = imageRef.current.getBoundingClientRect();
  
//       // Use pageX and pageY instead of clientX and clientY
//       const x = e.pageX - rect.left - window.scrollX;
//       const y = e.pageY - rect.top - window.scrollY;
  
//       console.log('Initial Position:(editing)', x, y);
  
//       setSelectionCircle({ centerX: x, centerY: y, radius: 0 });
//     }
//   };
  
//   const handleMouseMove = (e) => {
//     if (selectionCircle && mode === 'editing') {
//       const rect = imageRef.current.getBoundingClientRect();
  
//       // Use pageX and pageY instead of clientX and clientY
//       const x = e.pageX - rect.left - window.scrollX;
//       const y = e.pageY - rect.top - window.scrollY;
  
//       const deltaX = x - selectionCircle.centerX;
//       const deltaY = y - selectionCircle.centerY;
      
//       const radius = Math.sqrt(deltaX ** 2 + deltaY ** 2);
  
//       console.log('Radius:', radius);
  
//       setSelectionCircle({
//         ...selectionCircle,
//         radius,
//       });
//     }
//   };
//   const handleMouseUp = () => {
//     if (selectionCircle) {
//       const { centerX, centerY, radius } = selectionCircle;
  
//       setCircleRadius(radius);
//       setNewArea({
//         ...newArea,
//         coords: `${centerX},${centerY},${radius}`,
//       });
  
//       // Reset the selection circle
//       setSelectionCircle(null);
//     }
  
//     document.removeEventListener('mousemove', handleMouseMove);
//     document.removeEventListener('mouseup', handleMouseUp);
//   };
  
 

//   const handleAreaSelect = (area) => {
//     if (mode === 'normal') {
//       // Redirect to the link if in normal mode
//       window.open(area.href, '_blank');
//     } else {
//       const [centerX, centerY, radius] = area.coords.split(',').map(Number);
  
//       alert('Selected Area Center:(normal mode)', centerX, centerY, radius);
  
//       setCircleRadius(radius);
//       setSelectionCircle({ centerX, centerY, radius });
//       setNewArea({ ...area, coords: `${centerX},${centerY},${radius}`, radius }); // Correcting the radius value
//     }
//   };
  

//   return (
//     <div className={`image-editor-container ${mode}`}>
//       <div className="image-frame">
//         <img
//           src="Masterplan.jpg"
//           useMap="#image-map"
//           alt="Campus Map"
//           ref={imageRef}
//           onClick={handleImageClick}
//           onMouseDown={() => {
//             document.addEventListener('mousemove', handleMouseMove);
//             document.addEventListener('mouseup', handleMouseUp);
//           }}
//           style={{ cursor: mode === 'editing' ? 'crosshair' : 'default' }}
//         />

//         {selectionCircle && mode === 'editing' && (
//           <div
//             className="selection-circle"
//             style={{
//               left: selectionCircle.centerX - selectionCircle.radius,
//               top: selectionCircle.centerY - selectionCircle.radius,
//               width: selectionCircle.radius * 2,
//               height: selectionCircle.radius * 2,
//               borderRadius: '50%',
//               border: '2px dashed rgba(0,0,0,0.5)',
//               position: 'absolute',
//               pointerEvents: 'none',
//               zIndex: 1000,
//             }}
//           />
//         )}

//         <map name="image-map">
//           {areas.map((area) => (
//             <area
//               key={area.id}
//               target="_blank"
//               alt={area.alt}
//               title={area.alt}
//               href={area.href}
//               coords={area.coords}
//               shape={area.shape}
//               onClick={() => handleAreaSelect(area)}
//             />
//           ))}
//         </map>
//       </div>

//       <div className="editor-controls">
//         <button onClick={() => setMode(mode === 'normal' ? 'editing' : 'normal')}>
//           Switch to {mode === 'normal' ? 'Editing' : 'Normal'} Mode
//         </button>
//         {mode === 'editing' && (
//           <>
//             <label>
//               Shape:
//               <select value={newArea.shape} onChange={(e) => setNewArea({ ...newArea, shape: e.target.value })}>
//                 <option value="circle">Circle</option>
//                 {/* Add more shape options as needed */}
//               </select>
//             </label>
//             <label>
//               Radius:
//               <input type="number" value={circleRadius} onChange={(e) => setCircleRadius(Number(e.target.value))} />
//             </label>
//             <label>
//               Href:
//               <input type="text" value={newArea.href} onChange={(e) => setNewArea({ ...newArea, href: e.target.value })} />
//             </label>
//             <label>
//               Alt:
//               <input type="text" value={newArea.alt} onChange={(e) => setNewArea({ ...newArea, alt: e.target.value })} />
//             </label>
//             <button onClick={handleAddArea}>Add Area</button>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default MapCursor;






// new editedd -- -do not delele 
// MapCursor.jsx

import React, { useState, useRef } from 'react';
import './MapCursor.scss';

const MapCursor = () => {
  const [areas, setAreas] = useState([
    // { id: 1, shape: 'circle', coords: '637,1060,25', href: 'http://localhost:3000/hostels/65ad02475fb2597de896aad9', alt: 'G1 Hostel' },
    // { id: 2, shape: 'circle', coords: '702,1066,20', href: 'http://localhost:3000/hostels/65acfe7a57f79b7fd4d85a66', alt: 'G2 Hostel' },
    // // Add more areas as needed
  ]);

  const [newArea, setNewArea] = useState({
    shape: 'circle',
    coords: '',
    href: '',
    alt: '',
  });

  const [selectionCircle, setSelectionCircle] = useState(null);
  const [circleRadius, setCircleRadius] = useState(25); // Default radius
  const [mode, setMode] = useState('normal'); // 'normal' or 'editing'

  const imageRef = useRef(null);

  const handleAddArea = () => {
    if (selectionCircle) {
      setAreas([...areas, { ...newArea, id: areas.length + 1, coords: `${selectionCircle.centerX},${selectionCircle.centerY},${circleRadius}` }]);
      setNewArea({
        shape: 'circle',
        coords: '',
        href: '',
        alt: '',
      });
      setSelectionCircle(null); // Clear the selection circle after adding an area
    }
  };

  const handleImageClick = (e) => {
    if (mode === 'editing' && imageRef.current) {
      const rect = imageRef.current.getBoundingClientRect();

      // Use pageX and pageY instead of clientX and clientY
      const x = e.pageX - rect.left - window.scrollX;
      const y = e.pageY - rect.top - window.scrollY;

      console.log('Initial Position:(editing)', x, y);

      setSelectionCircle({ centerX: x, centerY: y, radius: 0 });
    }
  };

  const handleMouseMove = (e) => {
    if (selectionCircle && mode === 'editing' && imageRef.current) {
      const rect = imageRef.current.getBoundingClientRect();

      // Use pageX and pageY instead of clientX and clientY
      const x = e.pageX - rect.left - window.scrollX;
      const y = e.pageY - rect.top - window.scrollY;

      const deltaX = x - selectionCircle.centerX;
      const deltaY = y - selectionCircle.centerY;

      const radius = Math.sqrt(deltaX ** 2 + deltaY ** 2);

      console.log('Radius:', radius);

      setSelectionCircle({
        ...selectionCircle,
        radius,
      });
    }
  };

  const handleMouseUp = () => {
    if (selectionCircle) {
      const { centerX, centerY, radius } = selectionCircle;

      setCircleRadius(radius);
      setNewArea({
        ...newArea,
        coords: `${centerX},${centerY},${radius}`,
      });

      // Reset the selection circle
      setSelectionCircle(null);
    }

    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  const handleAreaSelect = (area) => {
    if (mode === 'normal') {
      // Redirect to the link if in normal mode
      window.open(area.href, '_blank');
    } else {
      const [centerX, centerY, radius] = area.coords.split(',').map(Number);

      alert('Selected Area Center:(normal mode)', centerX, centerY, radius);

      setCircleRadius(radius);
      setSelectionCircle({ centerX, centerY, radius });
      setNewArea({ ...area, coords: `${centerX},${centerY},${radius}`, radius });
    }
  };

  return (
    <div className={`image-editor-container ${mode}`}>
      <div className="image-frame">
        <img
          src="Masterplan.jpg"
          useMap="#image-map"
          alt="Campus Map"
          ref={imageRef}
          onClick={handleImageClick}
          onMouseDown={() => {
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
          }}
          style={{ cursor: mode === 'editing' ? 'crosshair' : 'default' }}
        />

        {selectionCircle && mode === 'editing' && (
          // <div
          //   className="selection-circle"
          //   style={{
          //     left: selectionCircle.centerX - selectionCircle.radius,
          //     top: selectionCircle.centerY - selectionCircle.radius,
          //     width: selectionCircle.radius * 2,
          //     height: selectionCircle.radius * 2,
          //     borderRadius: '50%',
          //     border: '2px dashed rgba(0,0,0,0.5)',
          //     position: 'absolute',
          //     pointerEvents: 'none',
          //     zIndex: 1000,
          //   }}
          // />

          <div
    className="selection-circle"
    style={{
      left: selectionCircle.centerX - selectionCircle.radius,
      top: selectionCircle.centerY - selectionCircle.radius,
      width: selectionCircle.radius * 2,
      height: selectionCircle.radius * 2,
      borderRadius: '50%',
      border: '2px dashed rgba(0,0,0,0.5)',
      position: 'absolute',
      pointerEvents: 'none',
      zIndex: 1000,
    }}
  />
        )}

        <map name="image-map">
          {areas.map((area) => (
            <area
              key={area.id}
              target="_blank"
              alt={area.alt}
              title={area.alt}
              href={area.href}
              coords={area.coords}
              shape={area.shape}
              onClick={() => handleAreaSelect(area)}
            />
          ))}
        </map>
      </div>

      <div className="editor-controls">
        <button onClick={() => setMode(mode === 'normal' ? 'editing' : 'normal')}>
          Switch to {mode === 'normal' ? 'Editing' : 'Normal'} Mode
        </button>
        {mode === 'editing' && (
          <>
            <label>
              Shape:
              <select value={newArea.shape} onChange={(e) => setNewArea({ ...newArea, shape: e.target.value })}>
                <option value="circle">Circle</option>
                {/* Add more shape options as needed */}
              </select>
            </label>
            <label>
              Radius:
              <input type="number" value={circleRadius} onChange={(e) => setCircleRadius(Number(e.target.value))} />
            </label>
            <label>
              Href:
              <input type="text" value={newArea.href} onChange={(e) => setNewArea({ ...newArea, href: e.target.value })} />
            </label>
            <label>
              Alt:
              <input type="text" value={newArea.alt} onChange={(e) => setNewArea({ ...newArea, alt: e.target.value })} />
            </label>
            <button onClick={handleAddArea}>Add Area</button>
          </>
        )}
      </div>
    </div>
  );
};

export default MapCursor;





// //trying something new
// import React, { useRef, useEffect, useState } from 'react';
// import * as THREE from 'three';

// const Map = () => {
//     const [hoveredBuilding, setHoveredBuilding] = useState(null);
//     const canvasRef = useRef();

//     useEffect(() => {
//         let scene, camera, renderer;
//         let raycaster, mouse;
//         let buildings = [];

//         const initThree = () => {
//             scene = new THREE.Scene();
//             camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
//             renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current });
//             renderer.setSize(window.innerWidth, window.innerHeight);

//             raycaster = new THREE.Raycaster();
//             mouse = new THREE.Vector2();

//             // Load city texture
//             const textureLoader = new THREE.TextureLoader();
//             const texture = textureLoader.load('Masterplan.jpg');
//             const cityMaterial = new THREE.MeshBasicMaterial({ map: texture });

//             // Create city plane
//             const cityPlaneGeometry = new THREE.PlaneGeometry(10, 10); // Adjust size as needed
//             const cityPlane = new THREE.Mesh(cityPlaneGeometry, cityMaterial);
//             scene.add(cityPlane);

//             // Example buildings (you can replace this with your own data)
//             const buildingData = [
//                 { id: 1, x: 0, y: 0, width: 2, height: 3, name: 'Building A' },
//                 { id: 2, x: 3, y: 1, width: 2, height: 2, name: 'Building B' },
//                 // Add more buildings as needed
//             ];

//             buildingData.forEach(buildingInfo => {
//                 const geometry = new THREE.BoxGeometry(buildingInfo.width, buildingInfo.height, 1);
//                 const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
//                 const building = new THREE.Mesh(geometry, material);
//                 building.position.set(buildingInfo.x, buildingInfo.y, 1); // Set z position to avoid overlap with city plane
//                 building.userData = { id: buildingInfo.id, name: buildingInfo.name }; // Store building info
//                 scene.add(building);
//                 buildings.push(building);
//             });

//             camera.position.z = 5;

//             animate();
//         };

//         const animate = () => {
//             requestAnimationFrame(animate);
//             renderer.render(scene, camera);
//         };

//         const onMouseMove = (event) => {
//             // Calculate mouse position in normalized device coordinates
//             mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
//             mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

//             // Update the picking ray with the camera and mouse position
//             raycaster.setFromCamera(mouse, camera);

//             // Calculate objects intersecting the picking ray
//             const intersects = raycaster.intersectObjects(buildings, true);

//             if (intersects.length > 0) {
//                 const building = intersects[0].object;
//                 // Set hovered building
//                 setHoveredBuilding(building.userData);
//             } else {
//                 // No building hovered
//                 setHoveredBuilding(null);
//             }
//         };

//         // Initialize Three.js
//         initThree();

//         // Add event listener for mouse move
//         window.addEventListener('mousemove', onMouseMove, false);

//         // Cleanup
//         return () => {
//             window.removeEventListener('mousemove', onMouseMove);
//         };
//     }, []);

//     return (
//         <canvas ref={canvasRef} style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }} />
//     );
// };

// export default Map;
