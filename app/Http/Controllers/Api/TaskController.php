<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Repositories\TaskRepository;
use Illuminate\Support\Facades\Validator;


class TaskController extends Controller
{


    public $dataRepository;
    public function __construct(TaskRepository $dataRepository)
    {   
        $this->dataRepository = $dataRepository;
    }
    
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $data = $this->dataRepository->getAll();
        return response()->json([
            'success' => true,
            'message' => 'Get Data',
            'data' => $data,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $formData = $request->all();
        $validator = Validator::make($formData,[
            'name' => 'required', 
            'description' => 'required', 
            'project_id' => 'required', 
        ]);

        if($validator->fails()){
            return response()->json([
                'success' => false,
                'message' => $validator->getMessageBag()->first(),
                'errors' => $validator->getMessageBag(),
            ]);
        }
        $storeData = $this->dataRepository->create($request);
        return response()->json([
            'success' => true ,
            'message' => 'Insert Success',
            'data' => $storeData,
        ]);

    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $dataById = $this->dataRepository->fineById($id);
        if(is_null($dataById)){
            return response()->json([
                'success' => false,
                'message' => 'Not Found',
                'data' => null,
            ]);
        }
        return response()->json([
            'success' => true,
            'message' => 'Task details',
            'data' => $dataById,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $dataId = $this->dataRepository->fineById($id);
        if(is_null($dataId)){
            return response()->json([
                'success' => false,
                'message' => 'Not Found',
                'data' => null,
            ]);
        }
        $formData = $request->all();
        $validator = Validator::make($formData, [
            'name' => 'required',
            'description' => 'required',
            'project_id' => 'required',
        ]);
        if($validator->fails()){
            return response()->json([
                'success' => false,
                'message' => $validator->getMessageBag()->first(),
            ]);
        }

        $upadateData = $this->dataRepository->edit($request, $id);
        return response()->json([
            'success' => true,  
            'message' => 'Update Successfully',  
            'data' =>$upadateData,  
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $dataById = $this->dataRepository->fineById($id);
        if(is_null($dataById)){
            return response()->json([
                'success' => false,
                'message' => 'Not Found',
                'data' => null,
            ]);
        }
        $delData = $this->dataRepository->delete($id);
        return response()->json([
            'success' => true,
            'message' => 'Delete Successfully',
        ]);

    }
}
