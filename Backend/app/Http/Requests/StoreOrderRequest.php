<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreOrderRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'order_id'=>'required|unique:orders',
            'order_name'=>'required',
            'costumer_name'=>'required',
            'costumer_account'=>'required',
            'agent_name'=>'required',
            'status'=>'required',
            'agent_id'=>'required',
            'Service'=>'required'    //for many to many sinon la valeur ne va pas s'enregistrer


        ];
    }
}
