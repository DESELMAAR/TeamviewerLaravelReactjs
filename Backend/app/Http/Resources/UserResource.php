<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'Post'=>$this->Post,
            'IsAdmin' => $this->IsAdmin,
            'Team'=>$this->Team,
            'email' => $this->email,
            'created_at' => $this->created_at->format('Y-m-d'),
            'team'=>$this->team
        ];
    }
}
