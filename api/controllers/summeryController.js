import Building from "../models/Building.js";
import Room from "../models/Room.js";
import User from "../models/User.js";

export const summeryHome = async (req, res, next) => {
  try {
    const BuildingCount=await Building.countDocuments();
    const RoomCount=await Room.countDocuments();
    const UserCount=await User.countDocuments();
    const buildingTypes = ["Hostel", "Department", "Academic", "Berm", "Adminblock", "Residentialquarter", "Amenities", "Others"];

    const pipeline = [
      {
        $match: {
          buildingType: { $in: buildingTypes },
        },
      },
      {
        $group: {
          _id: "$buildingType", // Use "_id" as the grouping key
          total:{$sum:1},
          totalRooms:{$sum: {$size: "$buildingRooms"}},
          vacantRooms: { $sum: "$vacantRooms" },
          occupiedRoomsLocked: { $sum: "$occupiedRoomsLocked" },
          occupiedRoomsOpen: { $sum: "$occupiedRoomsOpen" },
        },
      },
    ];

    const summary = await Building.aggregate(pipeline);

    const result = {};
    summary.forEach(item => {
      result[item._id] = {
        buildingType: item._id,
        total:item.total,
        totalRooms:item.totalRooms,
        vacantRooms: item.vacantRooms,
        occupiedRoomsLocked: item.occupiedRoomsLocked,
        occupiedRoomsOpen: item.occupiedRoomsOpen,
      };
    });

    // console.log('Summary:', result);

    res.status(200).json({ BuildingCount, RoomCount, UserCount, result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};