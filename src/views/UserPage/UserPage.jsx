import React from 'react';
import {
    Card, CardHeader, CardBody, Row, Col, Button
} from 'reactstrap';

import { PanelHeader, FormInputs, CardAuthor, CardSocials } from 'components';

import userBackground from 'assets/img/bg8.jpg';
import userAvatar from 'assets/img/lucas.png';

class User extends React.Component{
    render(){
        return (
            <div>
                <PanelHeader size="sm"/>
                <div className="content">
                    <Row>
                        <Col md={8} xs={12}>
                            <Card>
                                <CardHeader>
                                    <h5 className="title">Edit Profile</h5>
                                </CardHeader>
                                <CardBody>
                                    <form>
                                        <FormInputs
                                            ncols = {["col-md-5 pr-1" , "col-md-3 px-1" , "col-md-4 pl-1"]}
                                            proprieties = {[
                                                {
                                                    label : "Company (disabled)",
                                                    inputProps : {
                                                        type : "text",
                                                        defaultValue: "ScienceMatters AG"
                                                    }
                                                },
                                                {
                                                    label : "Username",
                                                    inputProps : {
                                                        type : "text",
                                                        defaultValue: "lucaspelloni"
                                                    }
                                                },
                                                {
                                                    label : "Email address",
                                                    inputProps : {
                                                        type : "email",
                                                        placeholder: "Email",
                                                    }
                                                }
                                            ]}
                                        />
                                        <FormInputs
                                            ncols = {["col-md-6 pr-1" , "col-md-6 pl-1"]}
                                            proprieties = {[
                                                {
                                                    label : "First Name",
                                                    inputProps : {
                                                        type : "text",
                                                        placeholder: "First Name",
                                                        defaultValue: "Lucas"
                                                    }
                                                },
                                                {
                                                    label : "Last Name",
                                                    inputProps : {
                                                        type : "text",
                                                        placeholder: "Last Name",
                                                        defaultValue: "Pelloni"
                                                    }
                                                }
                                            ]}
                                        />
                                        <FormInputs
                                            ncols = {["col-md-12"]}
                                            proprieties = {[
                                                {
                                                    label : "Address",
                                                    inputProps : {
                                                        type : "text",
                                                        placeholder: "Home Address",
                                                        defaultValue: "Naglerwiesenstrasse 88 "
                                                    }
                                                }
                                            ]}
                                        />
                                        <FormInputs
                                            ncols = {["col-md-4 pr-1" , "col-md-4 px-1" , "col-md-4 pl-1"]}
                                            proprieties = {[
                                                {
                                                    label : "City",
                                                    inputProps : {
                                                        type : "text",
                                                        defaultValue: "Zürich",
                                                        placeholder: "City"
                                                    }
                                                },
                                                {
                                                    label : "Country",
                                                    inputProps : {
                                                        type : "text",
                                                        defaultValue: "Switzerland",
                                                        placeholder: "Country"
                                                    }
                                                },
                                                {
                                                    label : "Postal Code",
                                                    inputProps : {
                                                        type : "number",
                                                        defaultValue: "8049",
                                                        placeholder: "ZIP Code"
                                                    }
                                                }
                                            ]}
                                        />
                                    </form>
                                    <Button>Save your profile</Button>
                                </CardBody>

                            </Card>

                        </Col>
                        <Col md={4}  xs={12}>
                            <Card className="card-user">
                                <div className="image">
                                    <img src={userBackground} alt="..."/>
                                </div>
                                <CardBody>
                                    <CardAuthor
                                        avatar={userAvatar}
                                        avatarAlt="..."
                                        title="Lucas Pelloni"
                                        description="lucaspelloni"
                                    />
                                    <p className="description text-center">
                                        Blockchain passionate <br/>
                                        Full Stack Engineer
                                    </p>
                                </CardBody>
                                <hr />
                                <CardSocials
                                    size="lg"
                                    socials={[
                                        {
                                            icon: "fab fa-facebook-f",
                                            href: "https://www.facebook.com/"
                                        },
                                        {
                                            icon: "fab fa-twitter",
                                            href: "https://www.facebook.com/"
                                        },
                                        {
                                            icon: "fab fa-google-plus-g",
                                            href: "https://plus.google.com/discover"
                                        },
                                    ]}
                                />
                            </Card>
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }
}

export default User;
