import React, { ReactElement, RefObject } from "react";
import Highcharts, { Chart } from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";

import HC_more from "highcharts/highcharts-more";
HC_more(Highcharts);

// eslint-disable-next-line @typescript-eslint/no-var-requires
require("highcharts/modules/draggable-points")(Highcharts);

export interface ControllerConfig {
	title: string;
	minY: number;
	maxY: number;
	amountXVal: number;
}

export default class Controller extends React.Component<
	{
		cfg: ControllerConfig;
	},
	{ options: Highcharts.Options }
> {
	internalChart!: Chart;

	constructor(props: { cfg: ControllerConfig }) {
		super(props);
		const data: number[] = [];
		const mean = (props.cfg.minY + props.cfg.maxY) / 2;
		for (let i = 0; i < props.cfg.amountXVal; i++) {
			data.push(mean);
		}
		this.state = {
			options: {
				title: {
					text: props.cfg.title
				},
				yAxis: {
					min: props.cfg.minY,
					max: props.cfg.maxY
				},
				series: [
					{
						type: "line",
						dragDrop: {
							draggableY: true,
							dragMaxY: props.cfg.maxY,
							dragMinY: props.cfg.minY
						},
						data: data
					}
				]
			}
		};
	}

	getData(): Array<number> {
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		return this.internalChart.series[0].points.map((p: Highcharts.Point) => p.y!);
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
