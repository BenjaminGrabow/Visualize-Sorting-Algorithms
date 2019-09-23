import React from "react";
import BubbleSort from "./components/SortAlgos/IterativeSorting/BubbleSort";
import SelectionSort from "./components/SortAlgos/IterativeSorting/SelectionSort";
import QuickSort from "./components/SortAlgos/RecursiveSorting/QuickSort";
import MergeSort from "./components/SortAlgos/RecursiveSorting/MergeSort";
import "./App.css";
import { Route, NavLink } from "react-router-dom";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount = () => {};

  render() {
    return (
      <div>
        <NavLink to="/bubble_sort" >Bubble Sort</NavLink>
        <NavLink to="/selection_sort" >Selection Sort</NavLink>
        <NavLink to="/merge_sort" >Selection Sort</NavLink>
        <NavLink to="/quick_sort" >Selection Sort</NavLink>
        <Route path="/bubble_sort" component={BubbleSort} />
        <Route path="/selection_sort" component={SelectionSort} />
        <Route path="/merge_sort" component={MergeSort} />
        <Route path="/quick_sort" component={QuickSort} />
      </div>
    );
  }
}

export default App;
