<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    public function Tasks()
    {
        return $this->hasMany(Task::class);
    }
}
