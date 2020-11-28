import React, { ReactElement, RefObject } from "react";
import Highcharts, { Chart } from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import HC_more from "highcharts/highcharts-more";
HC_more(Highcharts);

// eslint-disable-next-line @typescript-eslint/no-var-requires
require("highcharts/modules/draggable-points")(Highcharts);

export interface GraphInputConfig {
	title?: string;
	xTitle: string;
	yTitle: string;
	minY: number;
	maxY: number;
	data: Array<{ y: number }>;
}

export default class GraphInput extends React.Component<
	{ cfg: GraphInputConfig },
	{ options: Highcharts.Options }
> {
	internalChart!: Chart;

	constructor(props: { cfg: GraphInputConfig }) {
		super(props);

		this.state = {
			options: {
				title: {
					text: props.cfg.title
				},
				yAxis: {
					title: {
						text: props.cfg.yTitle
					},
					min: props.cfg.minY,
					max: props.cfg.maxY
				},
				xAxis: {
					title: {
						text: props.cfg.xTitle
					}
				},
				series: [
					{
						type: "line",
						dragDrop: {
							draggableY: true,
							dragPrecisionY: 1,
							dragMaxY: props.cfg.maxY,
							dragMinY: props.cfg.minY
						},
						showInLegend: false,
						data: props.cfg.data
					}
				]
			}
		};
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
