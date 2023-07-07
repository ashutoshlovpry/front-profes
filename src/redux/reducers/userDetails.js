
import { USERDETAIL ,PROFILEPIC} from "../../type";

const initialState = {
	userDetails:{
        user:{},
        profile_img:''
    }
};

export const userDetail = (state = initialState, action) => {
	switch (action.type) {
		case USERDETAIL:
			return {
				...state,
				userDetails: action.payload,
			};
        case PROFILEPIC:
            return{
                ...state,
                userDetails:{
                    ...state.userDetails,
                    profile_img:action.payload
                }
            }

            default:
			return state;

        }
        
    };
    