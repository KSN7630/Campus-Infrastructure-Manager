export const userInputs = [
{
  id: "fullName",
  label: "Full Name*",
  type: "text",
  placeholder: "John Doe",
},
{
  id: "email",
  label: "Email*",
  type: "email",
  placeholder: "user@iitj.ac.in",
},
// {
//   id: 3,
//   label: "Phone",
//   type: "text",
//   placeholder: "+91 9234 56 XXXX",
// },
{
  id: "password",
  label: "Password*",
  type: "password",
},
{
  id: "isAdmin",
  label: "Admin*",
  type: "dropdown",
  options: ['false', 'true'],
  placeholder: "Select admin status",
},
{
  id: "personType",
  label: "Designation*",
  type: "dropdown",
  options: ["Student", "Faculty", "Staff", "Other/Intern"],
  placeholder: "Select person type",
},
{
  id: "userName",
  label: "Username*",
  type: "text",
  placeholder: "Enter username",
},
{
  id: "personDesc",
  label: "Personal Note",
  type: "textarea",
  placeholder: "Enter personal note",
},
{
  id: "joiningDate",
  label: "Joining date*/Year of Admission*",
  type: "date",
  placeholder: "Select joining date",
},
{
  id: "leavingDate",
  label: "Expected Year of Completion of Degree (In case of Student)",
  type: "date",
  placeholder: "Select leaving date",
},
];



export const buildingInputs = [
  {
    id: "buildingType",
    label: "Building Type*",
    type: "dropdown",
    options: ["Hostel", "Department", "Academic", "Berm","Adminblock","Residentialquarter","Amenities","Others"],
    placeholder: "Select building type",
  },
  {
    id: "buildingName",
    label: "Building Name*",
    type: "text",
    placeholder: "Name",
  },
  {
    id: "buildingDesc",
    label: "Building Description",
    type: "text",
    placeholder: "Description",
  }
];

export const roomInputs = [
  {
    id: "buildingName",
    label: "Building Name",
    type: "text",
    placeholder: "Building Name",
  },
  
  {
    id: "roomNumber",
    label: "Room Number",
    type: "text",
    placeholder: "Room Number",
  },
  {
    id: "roomDiv",
    label: "Room Division",
    type: "dropdown",
    options: ["A", "B", "C","D","E","W","N","S","-"],
    placeholder: "Room Division",
  },
  {
    id: "roomStatus",
    label: "Room Status",
    type: "dropdown",
    options: ["Occupied and Open", "Vacant", "Occupied and Locked"],
    placeholder: "Select room status",
  },
  {
    id: "roomTitle",
    label: "Room Title",
    type: "text",
    placeholder: "Room Title",
  },
  {
    id: "roomDesc",
    label: "Room Description",
    type: "textarea",
    placeholder: "Room Description",
  },
  
];
export const roomHostelInputs = [
  {
    id: "buildingName",
    label: "Hostel Name",
    type: "text",
    placeholder: "Hostel Name",
  },
  
  {
    id: "roomNumber",
    label: "Room Number",
    type: "text",
    placeholder: "Room Number",
  },
  {
    id: "roomDiv",
    label: "Room Division",
    type: "dropdown",
    options: ["A", "B", "C","D","E","W","N","S","-"],
    placeholder: "Room Division",
  },
  {
    id: "roomStatus",
    label: "Occupancy Status",
    type: "dropdown",
    options: ["Occupied and Open", "Vacant", "Occupied and Locked"],
    placeholder: "Select status",
  },
  {
    id: "roomTitle",
    label: "Room Title",
    type: "text",
    placeholder: "Room Title",
  },
  {
    id: "roomDesc",
    label: "Room Description",
    type: "textarea",
    placeholder: "Eg. Area-200sq",
  },
  
];
export const roomInputsAcademic = [
  {
    id: "buildingName",
    label: "Academic Bld. Name",
    type: "text",
    placeholder: "LHC-X/Name",
  },
  
  {
    id: "roomNumber",
    label: "Room Number",
    type: "text",
    placeholder: "10X",
  },
  {
    id: "roomDiv",
    label: "Room Division",
    type: "dropdown",
    options: ["A", "B", "C","D","E","W","N","S","-"],
    placeholder: "Room Division",
  },
  {
    id: "roomStatus",
    label: "Occupancy Status",
    type: "dropdown",
    options: ["Occupied and Open", "Vacant", "Occupied and Locked"],
    placeholder: "Select Flat status",
  },
  {
    id: "roomTitle",
    label: "Room Title",
    type: "text",
    placeholder: "Room Title",
  },
  {
    id: "roomDesc",
    label: "Room Description",
    type: "textarea",
    placeholder: "Capacity-5XX",
  },
  
];
export const roomInputsDepartment = [
  {
    id: "buildingName",
    label: "Department Name",
    type: "text",
    placeholder: "Eg. CSE Department",
  },
  
  {
    id: "roomNumber",
    label: "Office / Classroom / Lab Number",
    type: "text",
    placeholder: "10X",
  },
  {
    id: "roomDiv",
    label: "Office / Classroom / Lab Division",
    type: "dropdown",
    options: ["A", "B", "C","D","E","W","N","S","-"],
    placeholder: "Select Division",
  },
  {
    id: "roomStatus",
    label: "Occupancy Status",
    type: "dropdown",
    options: ["Occupied and Open", "Vacant", "Occupied and Locked"],
    placeholder: "Select Status",
  },
  {
    id: "roomTitle",
    label: "Office / Classroom / Lab Title",
    type: "text",
    placeholder: "Room Title",
  },
  {
    id: "roomDesc",
    label: "Office / Classroom Description",
    type: "textarea",
    placeholder: "Capacity-5XX",
  },
  
];
export const roomInputsResidential = [
  {
    id: "buildingName",
    label: "Res. Quarter Name",
    type: "text",
    placeholder: "Type-X",
  },
  
  {
    id: "roomNumber",
    label: "Flat Number",
    type: "text",
    placeholder: "10XX",
  },
  {
    id: "roomDiv",
    label: "Flat Division",
    type: "dropdown",
    options: ["A", "B", "C","D","E","W","N","S","-"],
    placeholder: "Flat Division",
  },
  {
    id: "roomStatus",
    label: "Occupancy Status",
    type: "dropdown",
    options: ["Occupied and Open", "Vacant", "Occupied and Locked"],
    placeholder: "Select Flat status",
  },
  {
    id: "roomTitle",
    label: "Flat Title",
    type: "text",
    placeholder: "Flat Title",
  },
  {
    id: "roomDesc",
    label: "Flat Description",
    type: "textarea",
    placeholder: "Flat Description",
  },
  
];
export const roomInputsBerm = [
  {
    id: "buildingName",
    label: "Berm Number",
    type: "text",
    placeholder: "W-0X",
  },
  
  {
    id: "roomNumber",
    label: "Office/Lab/Room No.",
    type: "text",
    placeholder: "101",
  },
  {
    id: "roomDiv",
    label: "Office/Lab/Room Division",
    type: "dropdown",
    options: ["A", "B", "C","D","E","W","N","S","-"],
    placeholder: "Flat Division",
  },
  {
    id: "roomStatus",
    label: "Occupancy Status",
    type: "dropdown",
    options: ["Occupied and Open", "Vacant", "Occupied and Locked"],
    placeholder: "Select Flat status",
  },
  {
    id: "roomTitle",
    label: "Office/Lab/Room Title",
    type: "text",
    placeholder: "Title",
  },
  {
    id: "roomDesc",
    label: "Office/Lab/Room Description",
    type: "textarea",
    placeholder: "Ex.Reasearch Lab / Office of Infra",
  },
  
];

export const buildingHostelInputs = [
  {
    id: "buildingType",
    label: "Property Type*",
    type: "dropdown",
    options: ["Hostel", "Department", "Academic", "Berm","Adminblock","Residentialquarter","Amenities","Others"],
    placeholder: "Select building type",
  },
  {
    id: "buildingName",
    label: "Hostel Name*",
    type: "text",
    placeholder: "Eg. Karanj Hostel",
  },
  {
    id: "buildingDesc",
    label: "Hostel Description",
    type: "text",
    placeholder: "Boys Hostel",
  }
];
export const buildingAdminBlockInputs = [
  {
    id: "buildingType",
    label: "Type*",
    type: "dropdown",
    options: ["Hostel", "Department", "Academic", "Berm","Adminblock","Residentialquarter","Amenities","Others"],
    placeholder: "Select Property type",
  },
  {
    id: "buildingName",
    label: "Block Name*",
    type: "text",
    placeholder: "Block Name",
  },
  {
    id: "buildingDesc",
    label: "Block Description",
    type: "text",
    placeholder: "Description",
  }
];
export const buildingDepartmentInputs = [
  {
    id: "buildingType",
    label: "Property Type*",
    type: "dropdown",
    options: ["Hostel", "Department", "Academic", "Berm","Adminblock","Residentialquarter","Amenities","Others"],
    placeholder: "Select Property type",
  },
  {
    id: "buildingName",
    label: "Department Name*",
    type: "text",
    placeholder: "Eg.CSE Department",
  },
  {
    id: "buildingDesc",
    label: "Department Description",
    type: "text",
    placeholder: "Department Description",
  }
];
export const buildingBermInputs = [
  {
    id: "buildingType",
    label: "Type*",
    type: "dropdown",
    options: ["Hostel", "Department", "Academic", "Berm","Adminblock","Residentialquarter","Amenities","Others"],
    placeholder: "Select Property type",
  },
  {
    id: "buildingName",
    label: "Berm No.*",
    type: "text",
    placeholder: "W-01",
  },
  {
    id: "buildingDesc",
    label: "Berm Description",
    type: "text",
    placeholder: "Office/Lab-name",
  }
];
export const buildingAmenityInputs = [
  {
    id: "buildingType",
    label: "Type*",
    type: "dropdown",
    options: ["Hostel", "Department", "Academic", "Berm","Adminblock","Residentialquarter","Amenities","Others"],
    placeholder: "Select building type",
  },
  {
    id: "buildingName",
    label: "Amenity Name*",
    type: "text",
    placeholder: "Name",
  },
  {
    id: "buildingDesc",
    label: "Amenity Description",
    type: "text",
    placeholder: "Description",
  }
];

export const buildingQuarterInputs = [
  {
    id: "buildingType",
    label: "Type*",
    type: "dropdown",
    options: ["Hostel", "Department", "Academic", "Berm","Adminblock","Residentialquarter","Amenities","Others"],
    placeholder: "Select building type",
  },
  
  {
    id: "buildingName",
    label: "Res. QuarterType Name*",
    type: "text",
    placeholder: "Type-x",
  },
  {
    id: "buildingDesc",
    label: "QuarterType Description",
    type: "text",
    placeholder: "x-buildings",
  }
];




export const amenitiesInputs = [
  {
    id: "buildingName",
    label: "Anemity Name",
    type: "text",
    placeholder: "Anemity Name",
  },
  
  {
    id: "roomNumber",
    label: "Area Number",
    type: "text",
    placeholder: "Area Number",
  },
  {
    id: "roomDiv",
    label: "Area Division",
    type: "dropdown",
    options: ["A", "B", "C","D","E","W","N","S","-"],
    placeholder: "Area Division",
  },
  {
    id: "roomStatus",
    label: "Occupancy Status",
    type: "dropdown",
    options: ["Occupied and Open", "Vacant", "Occupied and Locked"],
    placeholder: "Select area status",
  },
  {
    id: "roomTitle",
    label: "Area Title",
    type: "text",
    placeholder: "Area Title",
  },
  {
    id: "roomDesc",
    label: "Area Description",
    type: "textarea",
    placeholder: "Area Description",
  },
  
];


export const adminblockroomInputs = [
  {
    id: "buildingName",
    label: "Block Name",
    type: "text",
    placeholder: "Block Name",
  },
  
  {
    id: "roomNumber",
    label: "Office Number",
    type: "text",
    placeholder: "Office Number",
  },
  {
    id: "roomDiv",
    label: "Room Division",
    type: "dropdown",
    options: ["A", "B", "C","D","E","W","N","S","-"],
    placeholder: "Room Division",
  },
  {
    id: "roomStatus",
    label: "Occupancy Status",
    type: "dropdown",
    options: ["Occupied and Open", "Vacant", "Occupied and Locked"],
    placeholder: "Select room status",
  },
  {
    id: "roomTitle",
    label: "Office Title",
    type: "text",
    placeholder: "Office Title",
  },
  {
    id: "roomDesc",
    label: "Office Description",
    type: "textarea",
    placeholder: "Office Description",
  },
  
];