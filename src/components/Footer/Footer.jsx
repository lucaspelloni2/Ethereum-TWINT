import React from 'react';
import { Container } from 'reactstrap';
// used for making the prop types of this component
import PropTypes from 'prop-types';

class Footer extends React.Component{
    render(){
        return (
            <footer className={"footer"
                + (this.props.default ? " footer-default":"")
            }>
                <Container fluid={this.props.fluid ? true:false}>
                    <nav>
                        <ul>
                            <li>
                                <a href="">
                                    Crypto Portfolio
                                </a>
                            </li>
                            <li>
                                <a href="https://presentation.creative-tim.com">
                                   About Us
                                </a>
                            </li>
                            <li>
                                <a href="https://blog.creative-tim.com">
                                   Blog
                                </a>
                            </li>
                        </ul>
                    </nav>
                    <div className="copyright">
                       Trying to improve the portfolio management for Cryptocurrencies>.
                    </div>
                </Container>
            </footer>
        );
    }
}

Footer.propTypes = {
    default: PropTypes.bool,
    fluid: PropTypes.bool
}

export default Footer;
