import  { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';

// AddNumber component to dispatch an action to add a number
// eslint-disable-next-line react/prop-types
const AddNumber = ({ number }) => {
    const dispatch = useDispatch(); // Get the dispatch function
    const hasMounted = useRef(false);

    useEffect(() => {
        if (!hasMounted.current) {
            dispatch({ type: 'Increase', payload: number }); // Dispatch an action on first mount
            hasMounted.current = true;
        }
    }, [dispatch, number]);

    return null;
};

export default AddNumber;
