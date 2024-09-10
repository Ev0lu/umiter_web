interface Profile {
    name: string;
    phone: string;
    mail: string;
    password: string;
  }

interface UserAction {
    type: string;
    payload?: any;
  }  

const defaultState: Profile = {
    name: '',
    phone: '',
    mail: '',
    password: ''
}

export const profileRegistrationReducer = (state = defaultState, action:UserAction): Profile => {
    switch (action.type) {
        case 'CHANGE_NAME':
            return {
                ...state,
                name: action.payload
            }
        case 'CHANGE_PHONE':
            return {
                ...state,
                phone: action.payload
            }
        case 'CHANGE_MAIL':
            return {
                ...state,
                mail: action.payload
            }
        case 'CHANGE_PASSWORD':
            return {
                ...state,
                password: action.payload
            }
        default:
            return state    
    }
}