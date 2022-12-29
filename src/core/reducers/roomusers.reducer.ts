export const ADD_USERS = "ADD_USERS" as const;
export const SET_USERS = 'SET_USERS' as const;

export const addRoomUsers = (roomId: string, users: any[]) => ({
    type: ADD_USERS,
    payload: { roomId, users },
});

export const setRoomUsers = (roomId: string, users: any[]) => ({
    type: ADD_USERS,
    payload: { roomId, users },
});
export type RoomUserState = Record<
    string, any[]
>;

type RoomUserActions =
    | {
        type: typeof ADD_USERS,
        payload: { roomId: string, users: any[] };
    }
    | {
        type: typeof SET_USERS,
        payload: { roomId: string, users: any[] };
    }


export const usersReducer = (state: RoomUserState, action: RoomUserActions) => {
    switch (action.type) {
        case ADD_USERS:
            return {
                roomId: state.roomId,
                users: state.users?.length ? [...state.users, ...action.payload.users] : action.payload.users,
            }
        case SET_USERS:
            return {
                roomId: state.roomId,
                users: action.payload.users,
            }
        default:
            return { ...state };
    }
}