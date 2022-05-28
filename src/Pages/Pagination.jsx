import React, { useState, useEffect } from 'react';

const Pagination = ({ showPerPage, onPaginationChange, numberOfButtons}) => {

    const [counter, setCounter] = useState(1);

    const onButtonClick = (type) => {
        if (type === 'next') {
            if (numberOfButtons === counter) {
                setCounter(counter);
            }
            else {
                setCounter(counter + 1);
            }
        } else if (type === 'prev') {
            if (counter === 1) {
                setCounter(1)
            } else {
                setCounter(counter - 1)
            }
        }
    }
    useEffect(() => {
        const value = showPerPage * counter;
        onPaginationChange(value - showPerPage, value)
        window.scrollTo({ top: 0 });
    }, [counter,showPerPage])

    return (
        <div className="d-flex justify-content-center">
            <nav aria-label="Page navigation example">
                <ul class="pagination">
                    <li class="page-item">
                        <button
                            class="page-link"
                            onClick={() => onButtonClick("prev")}
                        >
                            Previous
                        </button>
                    </li>

                    {new Array(numberOfButtons).fill(" ").map((el, index) => (
                        <li class={`page-item ${index + 1 === counter ? "active" : null}`}>
                            <button  
                                class="page-link"
                                onClick={() => setCounter(index + 1)}
                            >
                                {index + 1}
                            </button>
                        </li>
                    ))}
                    <li class="page-item">
                        <button
                            class="page-link"
                            onClick={() => onButtonClick("next")}
                        >
                            Next
                        </button>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default Pagination