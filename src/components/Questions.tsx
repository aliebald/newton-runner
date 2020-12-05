import React, { ReactElement } from "react";
import { Button, ButtonGroup } from "react-bootstrap";

export default function Questions(): ReactElement {
	return (
		<>
			<style type="text/css">
				{`
    .btn-flat {
      background-color: blue;
      color: white;
    }

    `}
			</style>

			<Button variant="flat" size="lg">
				flat button
			</Button>
			<Button variant="flat" size="lg">
				second
			</Button>
		</>
	);
}
