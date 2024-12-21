<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class OrderResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id'=>$this->id,
            'order_id'=>$this->order_id,
            'order_name'=>$this->order_name,
            'costumer_name'=>$this->costumer_name,
            'costumer_account'=>$this->costumer_account,
            'agent_name'=>$this->agent_name,
            'status'=>$this->status,
            'agent_id'=>$this->agent_id,
            'date'=>$this->created_at,
            'service'=>$this->Services



        ];
    }
}
