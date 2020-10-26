<?php
namespace App\Repositories;
use App\Model\Task;
use App\Interfaces\Crudinterface;
use Illuminate\Http\Request;
use Illuminate\Support\str;

class TaskRepository implements Crudinterface{
 
 
//  get all data 
    public function getAll()
    {
        $getData = Task::withCount('project')->orderBy('id', 'desc')->get();
        return $getData;
    }


    // get data find by Id 
    public function fineById($id)
    {
        $fineDatabyId = Task::with('project')->find($id);
        return $fineDatabyId;

    }

    public function create(Request $request)
    {
        $data = new Task;
        $data->name = ucfirst($request->name);
        $data->slug = str::slug($request->name, '-');
        $data->description = ucfirst($request->description);
        $data->project_id = $request->project_id;
        $data->save();
        return $data;
    }


    // edit repository 
    public function edit(Request $request, $id)
    {
        $data = $this->fineById($id);
        $data->name = ucfirst($request->name);
        $data->slug = str::slug($request->name, '-');
        $data->description = ucfirst($request->description);
        $data->project_id = $request->project_id;
        $data->status = $request->status;
        $data->save();
        return $data;

    }
    public function delete($id)
    {
        $data = $this->fineById($id);
        $data->delete();
        return $data;
    }

}