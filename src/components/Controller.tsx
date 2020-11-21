import React, { ReactElement, RefObject } from "react";
import Highcharts, { Chart } from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";

import HC_more from "highcharts/highcharts-more";
HC_more(Highcharts);

// eslint-disable-next-line @typescript-eslint/no-var-requires
require("highcharts/modules/draggable-points")(Highcharts);

export default class Controller extends React.Component<unknown, { options: Highcharts.Options }> {
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
						type: "line",
						dragDrop: {
							draggableY: true
						},
						data: [10, 20, 30, 40, 50]
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
