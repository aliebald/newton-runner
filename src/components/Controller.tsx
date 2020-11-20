import React, { ReactElement, RefObject } from "react";
import Highcharts, { Chart } from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";

import HC_more from "highcharts/highcharts-more";
HC_more(Highcharts);

// eslint-disable-next-line @typescript-eslint/no-var-requires
require("highcharts/modules/draggable-points")(Highcharts);

type ControllerState = {
	options: {
		yAxis: unknown;
		series: Array<{
			dragDrop: unknown;
			data: Array<number>;
		}>;
	};
};

export default class Controller extends React.Component<unknown, ControllerState> {
	internalChart!: Chart;

	constructor(props: unknown) {
		super(props);
		this.state = {
			options: {
				yAxis: {
					softMin: 0,
					softMax: 100
				},
				series: [
					{
						dragDrop: {
							draggableY: true
						},
						data: [10, 20, 50, 30, 40]
					}
				]
			}
		};
	}

	getData(): Array<number> {
		return this.state.options.series[0].data;
	}

	afterChartCreated(chart: Chart): void {
		this.internalChart = chart;
	}

	render(): ReactElement {
		return (
			<HighchartsReact
				constructorType={"chart"}
				callback={this.afterChartCreated}
				highcharts={Highcharts}
				options={this.state.options}
			/>
		);
	}
}
