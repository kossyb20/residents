import { lazy } from "react";

/** Every screen in the app, in the order of the design canvas. `file` is the design artboard it implements. */
export const screens = [
  { name: "Main", path: "/map", title: "Building map", file: "Main.dc.html", Component: lazy(() => import("./screens/Main.jsx")) },
  { name: "Home", path: "/", title: "Home", file: "Home.dc.html", Component: lazy(() => import("./screens/Home.jsx")) },
  { name: "Diary", path: "/diary", title: "Diary", file: "Diary.dc.html", Component: lazy(() => import("./screens/Diary.jsx")) },
  { name: "Social", path: "/social", title: "Social", file: "Social.dc.html", Component: lazy(() => import("./screens/Social.jsx")) },
  { name: "Money", path: "/money", title: "Money", file: "Money.dc.html", Component: lazy(() => import("./screens/Money.jsx")) },
  { name: "Esusu", path: "/esusu", title: "Esusu", file: "Esusu.dc.html", Component: lazy(() => import("./screens/Esusu.jsx")) },
  { name: "Markets", path: "/markets", title: "Markets", file: "Markets.dc.html", Component: lazy(() => import("./screens/Markets.jsx")) },
  { name: "TradingFloor", path: "/trading-floor", title: "Trading floor", file: "TradingFloor.dc.html", Component: lazy(() => import("./screens/TradingFloor.jsx")) },
  { name: "Bank", path: "/bank", title: "Bank", file: "Bank.dc.html", Component: lazy(() => import("./screens/Bank.jsx")) },
  { name: "Housing", path: "/housing", title: "Housing", file: "Housing.dc.html", Component: lazy(() => import("./screens/Housing.jsx")) },
  { name: "Statement", path: "/statement", title: "Bank statement", file: "Statement.dc.html", Component: lazy(() => import("./screens/Statement.jsx")) },
  { name: "Life", path: "/life", title: "Life", file: "Life.dc.html", Component: lazy(() => import("./screens/Life.jsx")) },
  { name: "Rules", path: "/rules", title: "Rules for Amara", file: "Rules.dc.html", Component: lazy(() => import("./screens/Rules.jsx")) },
  { name: "Work", path: "/work", title: "Work", file: "Work.dc.html", Component: lazy(() => import("./screens/Work.jsx")) },
  { name: "Gigs", path: "/gigs", title: "My gigs", file: "Gigs.dc.html", Component: lazy(() => import("./screens/Gigs.jsx")) },
  { name: "Play", path: "/play", title: "Play", file: "Play.dc.html", Component: lazy(() => import("./screens/Play.jsx")) },
  { name: "Skills", path: "/skills", title: "Skills", file: "Skills.dc.html", Component: lazy(() => import("./screens/Skills.jsx")) },
  { name: "Settings", path: "/settings", title: "Settings", file: "Settings.dc.html", Component: lazy(() => import("./screens/Settings.jsx")) },
  { name: "Ludo", path: "/ludo", title: "Ludo table", file: "Ludo.dc.html", Component: lazy(() => import("./screens/Ludo.jsx")) },
  { name: "Chess", path: "/chess", title: "Chess", file: "Chess.dc.html", Component: lazy(() => import("./screens/Chess.jsx")) },
  { name: "TicTacToe", path: "/tic-tac-toe", title: "Tutorial: tic-tac-toe", file: "TicTacToe.dc.html", Component: lazy(() => import("./screens/TicTacToe.jsx")) },
  { name: "Ayo", path: "/ayo", title: "Ayo", file: "Ayo.dc.html", Component: lazy(() => import("./screens/Ayo.jsx")) },
  { name: "Draughts", path: "/draughts", title: "Draughts", file: "Draughts.dc.html", Component: lazy(() => import("./screens/Draughts.jsx")) },
  { name: "Reversi", path: "/reversi", title: "Reversi", file: "Reversi.dc.html", Component: lazy(() => import("./screens/Reversi.jsx")) },
  { name: "FourInARow", path: "/four-in-a-row", title: "Four in a row", file: "FourInARow.dc.html", Component: lazy(() => import("./screens/FourInARow.jsx")) },
  { name: "UltimateTTT", path: "/ultimate-ttt", title: "Ultimate tic-tac-toe", file: "UltimateTTT.dc.html", Component: lazy(() => import("./screens/UltimateTTT.jsx")) },
  { name: "Shapes", path: "/shapes", title: "Shapes (Whot-style)", file: "Shapes.dc.html", Component: lazy(() => import("./screens/Shapes.jsx")) },
  { name: "Go", path: "/go", title: "Go 9×9", file: "Go.dc.html", Component: lazy(() => import("./screens/Go.jsx")) },
  { name: "Media", path: "/media", title: "Media", file: "Media.dc.html", Component: lazy(() => import("./screens/Media.jsx")) },
  { name: "Story", path: "/story", title: "News story", file: "Story.dc.html", Component: lazy(() => import("./screens/Story.jsx")) },
  { name: "GigExchange", path: "/gig-exchange", title: "Gig Exchange", file: "GigExchange.dc.html", Component: lazy(() => import("./screens/GigExchange.jsx")) },
  { name: "Request", path: "/request", title: "Request detail", file: "Request.dc.html", Component: lazy(() => import("./screens/Request.jsx")) },
  { name: "Notebook", path: "/notebook", title: "Notebook", file: "Notebook.dc.html", Component: lazy(() => import("./screens/Notebook.jsx")) },
  { name: "Writing", path: "/writing", title: "Writing", file: "Writing.dc.html", Component: lazy(() => import("./screens/Writing.jsx")) },
  { name: "WorkDetail", path: "/work-detail", title: "Published work", file: "WorkDetail.dc.html", Component: lazy(() => import("./screens/WorkDetail.jsx")) },
  { name: "Career", path: "/career", title: "Career", file: "Career.dc.html", Component: lazy(() => import("./screens/Career.jsx")) },
  { name: "Lab", path: "/lab", title: "Lab", file: "Lab.dc.html", Component: lazy(() => import("./screens/Lab.jsx")) },
  { name: "Library", path: "/library", title: "Library", file: "Library.dc.html", Component: lazy(() => import("./screens/Library.jsx")) },
  { name: "Council", path: "/council", title: "Council hall", file: "Council.dc.html", Component: lazy(() => import("./screens/Council.jsx")) },
  { name: "Court", path: "/court", title: "Courthouse", file: "Court.dc.html", Component: lazy(() => import("./screens/Court.jsx")) },
  { name: "LawRegister", path: "/law-register", title: "Law register", file: "LawRegister.dc.html", Component: lazy(() => import("./screens/LawRegister.jsx")) },
  { name: "Constitution", path: "/constitution", title: "Constitution", file: "Constitution.dc.html", Component: lazy(() => import("./screens/Constitution.jsx")) },
  { name: "Stadium", path: "/stadium", title: "Rooftop stadium", file: "Stadium.dc.html", Component: lazy(() => import("./screens/Stadium.jsx")) },
  { name: "Arcade", path: "/arcade", title: "Arcade", file: "Arcade.dc.html", Component: lazy(() => import("./screens/Arcade.jsx")) },
  { name: "GameLobby", path: "/game-lobby", title: "Game lobby", file: "GameLobby.dc.html", Component: lazy(() => import("./screens/GameLobby.jsx")) },
  { name: "CommonRoom", path: "/common-room", title: "Common room", file: "CommonRoom.dc.html", Component: lazy(() => import("./screens/CommonRoom.jsx")) },
  { name: "Lobby", path: "/lobby", title: "Lobby", file: "Lobby.dc.html", Component: lazy(() => import("./screens/Lobby.jsx")) },
  { name: "Supermarket", path: "/supermarket", title: "Supermarket", file: "Supermarket.dc.html", Component: lazy(() => import("./screens/Supermarket.jsx")) },
  { name: "ResidentCard", path: "/resident-card", title: "Resident card", file: "ResidentCard.dc.html", Component: lazy(() => import("./screens/ResidentCard.jsx")) },
  { name: "Thread", path: "/thread", title: "Message thread", file: "Thread.dc.html", Component: lazy(() => import("./screens/Thread.jsx")) },
  { name: "CouncilAgenda", path: "/council-agenda", title: "Council agenda", file: "CouncilAgenda.dc.html", Component: lazy(() => import("./screens/CouncilAgenda.jsx")) },
  { name: "JuryDuty", path: "/jury-duty", title: "Jury duty", file: "JuryDuty.dc.html", Component: lazy(() => import("./screens/JuryDuty.jsx")) },
  { name: "Councillors", path: "/councillors", title: "Councillors", file: "Councillors.dc.html", Component: lazy(() => import("./screens/Councillors.jsx")) },
  { name: "Petitions", path: "/petitions", title: "Petitions", file: "Petitions.dc.html", Component: lazy(() => import("./screens/Petitions.jsx")) },
  { name: "Treasury", path: "/treasury", title: "Treasury", file: "Treasury.dc.html", Component: lazy(() => import("./screens/Treasury.jsx")) },
  { name: "Elections", path: "/elections", title: "Elections", file: "Elections.dc.html", Component: lazy(() => import("./screens/Elections.jsx")) },
  { name: "Cases", path: "/cases", title: "Court cases", file: "Cases.dc.html", Component: lazy(() => import("./screens/Cases.jsx")) },
  { name: "Settlers", path: "/settlers", title: "Settlers", file: "Settlers.dc.html", Component: lazy(() => import("./screens/Settlers.jsx")) },
  { name: "Verdicts", path: "/verdicts", title: "Verdicts", file: "Verdicts.dc.html", Component: lazy(() => import("./screens/Verdicts.jsx")) },
  { name: "Appeals", path: "/appeals", title: "Appeals", file: "Appeals.dc.html", Component: lazy(() => import("./screens/Appeals.jsx")) },
  { name: "TakeToCourt", path: "/take-to-court", title: "Take to court", file: "TakeToCourt.dc.html", Component: lazy(() => import("./screens/TakeToCourt.jsx")) },
  { name: "AgendaItem", path: "/agenda-item", title: "Agenda item", file: "AgendaItem.dc.html", Component: lazy(() => import("./screens/AgendaItem.jsx")) },
];

const byFile = new Map(screens.map((s) => [s.file, s]));

/** Maps a design link ("Court.dc.html", "AgendaItem.dc.html?item=lift") to an app path, or null if it is not a screen. */
export function screenPath(href) {
  const [file, query] = href.split("?");
  const screen = byFile.get(file.replace(/^\.?\//, ""));
  if (!screen) return null;
  return query ? screen.path + "?" + query : screen.path;
}
