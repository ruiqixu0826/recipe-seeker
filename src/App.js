import './App.css';
import Problem0 from "./components/problems/Problem0";
import Problem1 from "./components/problems/Problem1";
import Problem2 from "./components/problems/Problem2";
import Problem3 from "./components/problems/Problem3";
import Problem4 from "./components/problems/Problem4";
import Problem5 from "./components/problems/Problem5";
import Problem6 from "./components/problems/Problem6";
import Problem7 from "./components/problems/Problem7";
import ProblemWrapper from "./components/problems/ProblemWrapper";

function App() {
  return (
    <>
      <ProblemWrapper name='Problem 0'><Problem0 /></ProblemWrapper>
      <ProblemWrapper name='Problem 1'><Problem1 /></ProblemWrapper>
      <ProblemWrapper name='Problem 2'><Problem2 /></ProblemWrapper>
      <ProblemWrapper name='Problem 3'><Problem3 /></ProblemWrapper>
      <ProblemWrapper name='Problem 4'><Problem4 /></ProblemWrapper>
      <ProblemWrapper name='Problem 5'><Problem5 /></ProblemWrapper>
      <ProblemWrapper name='Problem 6'><Problem6 /></ProblemWrapper>
      <ProblemWrapper name='Problem 7 (stretch)'><Problem7 /></ProblemWrapper>

    </>
  );
}

export default App;
