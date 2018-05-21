import React from 'react';
import {
  Row, Col,
  Card, CardHeader, CardBody
} from 'reactstrap';


import { PanelHeader } from 'components';


class FullScreenMap extends React.Component{
    render(){
        return (
          <div>
            <PanelHeader size="sm" />
            <div className="content">
              <Row>
                <Col xs={12}>
                  <Card>
                    <CardHeader>Web 3 Integration</CardHeader>
                    <CardBody>

                        <p>TODO: Integrate WEB 3 JS here!</p>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </div>
          </div>
        );
    }
}

export default FullScreenMap;
