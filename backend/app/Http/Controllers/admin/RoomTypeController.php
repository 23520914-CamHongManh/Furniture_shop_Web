<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\RoomType;
use Illuminate\Support\Facades\Validator;


class RoomTypeController extends Controller
{
    //This method will return all room types
    public function index()
    {
        $room_types = RoomType::orderBy('created_at', 'desc')->get();
        return response()->json([
            'status' => 200,
            'data' => $room_types
        ]);
    }

    //This method will store a roomtype in db
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required'
        ]);
        if ($validator->fails()) {
            return response()->json([
                'status' => 400,
                'errors' => $validator->errors()
            ], 400);
        }
        $room_type = new RoomType();
        $room_type->name = $request->name;
        $room_type->status = $request->status;
        $room_type->save();

        return response()->json([
            'status' => 200,
            'message' => 'RoomType added successfully',
            'data' => $room_type
        ], 200);
    }

    //This method will return a single room type
    public function show($id)
    {
        $room_types = RoomType::find($id);

        if ($room_types == null) {
            return response()->json([
                'status' => 404,
                'message' => 'RoomType not found',
                'data' => []
            ], 404);
        }

        return response()->json([
            'status' => 200,
            'data' => $room_types
        ]);
    }


    //This method will update a single room type
    public function update($id, Request $request)
    {
        $room_type = RoomType::find($id);

        if ($room_type == null) {
            return response()->json([
                'status' => 404,
                'message' => 'RoomType not found',
                'data' => []
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'name' => 'required'
        ]);
        if ($validator->fails()) {
            return response()->json([
                'status' => 400,
                'errors' => $validator->errors()
            ], 400);
        }

        $room_type->name = $request->name;
        $room_type->status = $request->status;
        $room_type->save();

        return response()->json([
            'status' => 200,
            'message' => 'RoomType updated successfully',
            'data' => $room_type
        ], 200);
    }


    //This method will destroy a single roomtype
    public function destroy($id)
    {
        $room_type = RoomType::find($id);

        if ($room_type == null) {
            return response()->json([
                'status' => 404,
                'message' => 'RoomType not found',
                'data' => []
            ], 404);
        }

        $room_type->delete();

        return response()->json([
            'status' => 200,
            'message' => 'RoomType deleted successfully'
        ], 200);
    }
}
