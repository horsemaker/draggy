import { Outlet, Route, Routes } from "react-router-dom";
import { Board, BoardCardModal, Title } from "./components";

function App() {
  return (
    <div className="mt-8 max-w-4xl m-auto flex flex-col gap-10">
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Title text="Draggy🎏" />
              <Board />
              <Outlet />
            </>
          }
        >
          <Route path=":groupId/:taskId" element={<BoardCardModal />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
