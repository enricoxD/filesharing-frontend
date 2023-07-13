import { useState, useEffect } from 'react';
import {UserType} from "@/utils/baseTypes";
import {api} from "@/utils/api";

export const useCurrentUser = (): UserType | null => {
    const [user, setUser] = useState<UserType | null>(null);

    useEffect(() => {
        api.get('user/current-user')
            .then((response) => {
                setUser(response.data.data)
            })
    }, []);

    return user;
};