import React from "react";


const Privacy = () => {



    return(
        <div className="container mt-5">
            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#myModal">
                Privacy Policy
            </button>

            <div className="modal" id="myModal">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Privacy Policy</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div className="modal-body">
                            <form>
<p>
    NavMap is public and posts are immediately viewable and searchable by anyone around
    the world. At the moment, no messages are private and all messages may be viewed publicly
    by persons who are or are not registered.
</p>
                                <p>
    When you use NavMap, we receive only the personal information you chose to share with us,
    such as e-mail, address, and places visited. Places you have pinned as visited will be
    shared with us and the public at large.
                                </p>
                                <p>
    We will not use your information for marketing purposes but we may use it for security purposes.
    If you register as a Provider, we will require your credit card information and you may choose
    to share and advertise your place of business to the public. We will collect the information you provide
    regarding your place of business.
                                </p>
                                <p>
    In further regard to Providers, we may collect further information to protect our users
    from advertisement of illegal or illicit business and take action to prevent dissemination
                                    of content we feel does not relate to the spirit of travel.
                                </p>


                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="submit" className="btn btn-primary">Agree</button>
                        </div>
                    </div>
                </div>
            </div>

        </div>





)
}

export default Privacy