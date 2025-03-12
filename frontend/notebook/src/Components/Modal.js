import React from 'react'


const Modal = ({ enote, handleChange, handleClick }) => {

    return (

        <>

            <div className="modal fade" id="exampleModal" tabIndex="-1">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" ></button>
                        </div>
                        <div className="modal-body">
                            <form >
                                <div className="mb-3">
                                    <label htmlFor="etitle" className="form-label">
                                        Title
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="etitle"
                                        onChange={handleChange}
                                        value={enote.etitle}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="ecategory" className="form-label">
                                        Tag
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="ecategory"
                                        onChange={handleChange}
                                        value={enote.ecategory}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="econtent" className="form-label">
                                        Content
                                    </label>
                                    <textarea
                                        type="text"
                                        className="form-control"
                                        id="econtent"
                                        onChange={handleChange}
                                        value={enote.econtent}
                                        required
                                    />
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={handleClick}>Save changes</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Modal
