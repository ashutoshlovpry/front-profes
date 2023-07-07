
import { USERDETAIL ,PROFILEPIC} from "../../type";
export const userDetails = (data) => {
	return {
		type: USERDETAIL,
		payload:data
	};
};
export const profileImg=(data)=>{
    return {
		type: PROFILEPIC,
		payload:data
	};
}