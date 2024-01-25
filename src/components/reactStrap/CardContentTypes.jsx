import React from "react";
import {
    Card,
    CardText,
    CardBody,
    CardLink,
    CardTitle,
    CardSubtitle
} from "reactstrap";
import { media2 } from "helper/constant";

const Example = () => {
    return (
        <div className="reactstrap-card-block">
            <Card>
                <CardBody>
                    <CardTitle>Card title</CardTitle>
                    <CardSubtitle>Card subtitle</CardSubtitle>
                </CardBody>
                <img width="100%" src={media2} alt="Card cap" />
                <CardBody>
                    <CardText>
                        Some quick example text to build on the card title and
                        make up the bulk of the card's content.
                    </CardText>
                    <CardLink href="#">Card Link</CardLink>
                    <CardLink href="#">Another Link</CardLink>
                </CardBody>
            </Card>
        </div>
    );
};

export default Example;
