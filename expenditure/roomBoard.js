import { room as _room, board as _board } from '../utils/index.js';

// Room and Board
export let room = _room;
export let board = _board;

export default function(sessions) {
    room *= sessions;
    board *= sessions;

    return room + board;
}
