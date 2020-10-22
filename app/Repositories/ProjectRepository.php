<?php
namespace App\Repositories;
use App\Model\Project;
use App\Interfaces\Crudinterface;
use Illuminate\Support\str;
use Illuminate\Http\Request;

class ProjectRepository implements Crudinterface{
 
 
//  get all data 
    public function getAll()
    {
        $project = Project::withCount('tasks')->orderBy('id', 'desc')->get();
        return $project;
    }


    // get data find by Id 
    public function fineById($id)
    {
        $project = Project::with('tasks')->find($id);
        return $project;

    }

    public function create(Request $request)
    {
        $project = new Project;
        $project->name = ucfirst($request->name);
        $project->slug = str::slug($request->name, '-');
        $project->description = ucfirst($request->description);
        $project->user_id = $request->user_id;
        $project->save();
        return $project;
    }


    // edit repository 
    public function edit(Request $request, $id)
    {
        $project = $this->fineById($id);
        $project->name = ucfirst($request->name);
        $project->slug = str::slug($request->name, '-');
        $project->description = ucfirst($request->description);
        $project->user_id = $request->user_id;
        $project->status = $request->status;
        $project->save();
        return $project;

    }
    public function delete($id)
    {


        $project = $this->fineById($id);
        $project->delete();
        return $project;
    }

}