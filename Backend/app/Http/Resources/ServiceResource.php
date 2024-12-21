<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ServiceResource extends JsonResource
{
    // public static $wrap = null;
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray( $request): array
    {
        return [
            "id"=>$this->id,
            "Service"=>$this->Service,
            "Added_By"=>$this->Added_By,
            "Date"=>$this->created_at,
            "user"=>$this->user
            
        ];
    }
}
