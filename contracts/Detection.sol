pragma solidity ^0.5.11;

contract Detection{
    
    event Added(uint256 index);
    
    uint items=0;
    
    struct State{
        string description;
        address person;
    }
    
    struct Medicine{
        string MedicineName;
        uint MedicineId;
        string Company;
        address Creator;
        string Manufacturingdate;
        uint Rate;
        string Ingredients;
        string Description;
        uint256 totalStates;
        mapping (uint256 => State) positions;
    }
    
    mapping(uint=>Medicine) AllMedicines;
    
    
     function concat(string memory _a, string memory _b) public pure returns (string memory){
        bytes memory bytes_a = bytes(_a);
        bytes memory bytes_b = bytes(_b);
        string memory length_ab = new string(bytes_a.length + bytes_b.length);
        bytes memory bytes_c = bytes(length_ab);
        uint k = 0;
        for (uint i = 0; i < bytes_a.length; i++) bytes_c[k++] = bytes_a[i];
        for (uint i = 0; i < bytes_b.length; i++) bytes_c[k++] = bytes_b[i];
        return string(bytes_c);
    }
    

    
    function AddMedicine(uint _rate,string memory _name,string memory _company,string memory _date,string memory _ingredients,string memory _description)public returns(bool){
            Medicine memory NewMedicine=Medicine(_name,items,_company,msg.sender,_date,_rate,_ingredients,_description,0);
            AllMedicines[items]=NewMedicine;
            items = items+1;
            emit Added(items-1);
            return true;
            
    }
    
    function SearchMedicine(uint _id)public view returns(string memory){
           require(_id<items);
           string memory output="Medicine Name ";
           output=concat(output,AllMedicines[_id].MedicineName);
           output=concat(output,"<br>Madeby :");
           output=concat(output,AllMedicines[_id].Company);
           output=concat(output,"<br>Manufacturing Date: ");
           output=concat(output,AllMedicines[_id].Manufacturingdate);
           output=concat(output,"<br>Ingredients: ");
           output=concat(output,AllMedicines[_id].Ingredients);
           output=concat(output,"<br>Description: ");
           output=concat(output,AllMedicines[_id].Description);
          for (uint256 j=0; j<AllMedicines[_id].totalStates; j++){
            output=concat(output, AllMedicines[_id].positions[j].description);
        }
           return output;
    }
    function addState(uint _productId, string memory _date, string memory _location) public returns (string memory) {
        require(_productId<items);
        string memory desc="<br><br><b>Date: ";
        desc=concat(desc, _date);
        desc=concat(desc, "</b><br>Location: ");
        desc=concat(desc, _location);
        State memory newState = State({person: msg.sender, description: desc});
        AllMedicines[_productId].positions[ AllMedicines[_productId].totalStates ]=newState;
        AllMedicines[_productId].totalStates = AllMedicines[_productId].totalStates +1;
        return desc;
    }

}