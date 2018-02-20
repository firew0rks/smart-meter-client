pragma solidity ^0.4.18;

contract Power {
	uint production;
	uint current_usage;
	uint average_usage;


	function Power() public {
		production = 1000;
		current_usage = 1567;
		average_usage = 1234;
	}

	function getProduction() public view returns (uint) {
		return production;
	}
	function getCurrent_usage() public view returns (uint) {
		return current_usage;
	}
	function getAverage_usage() public view returns (uint) {
		return average_usage;
	}
}