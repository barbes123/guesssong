import React from 'react';
import { MusicIcon, PlayCircle } from 'lucide-react';

const PlayerRoundDisplay = ({ gameState, t }) => {
  const { 
    activeRoundId, 
    roundProgress = {}, 
    activeNote,
    isPlaying = false,
    currentRoundPoints,
    players = [],
    language = 'en',
    currentPlayerIndex = 0
  } = gameState;

  const roundId = activeRoundId;
  const progress = roundProgress[roundId] || {};
  
  // Safely get activatedCategories and usedNotes
  const activatedCategories = React.useMemo(() => {
    const cats = progress.activatedCategories;
    if (cats instanceof Set) return cats;
    if (Array.isArray(cats)) return new Set(cats);
    if (typeof cats === 'object' && cats !== null) {
      return new Set(Object.keys(cats).filter(key => cats[key] === true));
    }
    return new Set();
  }, [progress.activatedCategories]);

  const usedNotes = React.useMemo(() => {
    const notes = progress.usedNotes;
    if (notes instanceof Set) return notes;
    if (Array.isArray(notes)) return new Set(notes);
    if (typeof notes === 'object' && notes !== null) {
      return new Set(Object.keys(notes).filter(key => notes[key] === true));
    }
    return new Set();
  }, [progress.usedNotes]);

  const isMelodyRound = roundId === 2;

  // Sample categories
  const displayCategories = [
    { id: 'pop', name: { en: 'Pop Music', ru: 'Поп Музыка' } },
    { id: 'rock', name: { en: 'Rock Classics', ru: 'Рок Классика' } },
    { id: 'hiphop', name: { en: 'Hip-Hop', ru: 'Хип-Хоп' } },
    { id: 'movies', name: { en: 'Movie Soundtracks', ru: 'Саундтреки' } },
  ];

  // Sort players by score
  const sortedPlayers = [...players]
    .map((player, idx) => ({ 
      ...player, 
      originalIndex: idx,
      isCurrentPlayer: idx === currentPlayerIndex
    }))
    .sort((a, b) => (b.score || 0) - (a.score || 0));

  const getNoteCellClass = (categoryId, noteIndex, isMelody = false) => {
    const noteId = `${categoryId}-${noteIndex}`;
    const isUsed = usedNotes.has(noteId);
    const isSelected = activeNote?.categoryId === categoryId && activeNote?.noteIndex === noteIndex && !activeNote.isReveal;
    const isRevealActive = activeNote?.categoryId === categoryId && activeNote?.noteIndex === noteIndex && activeNote.isReveal;
    const result = progress.results?.[noteId];
    
    if (isSelected) return 'player-note-cell active';
    if (isRevealActive) return 'player-note-cell reveal';
    if (isUsed) {
      if (result === 'correct') return 'player-note-cell correct';
      if (result === 'wrong') return 'player-note-cell wrong';
      return 'player-note-cell used';
    }
    return 'player-note-cell available';
  };

  const getPointsCellClass = (categoryId, activatedCount, isPointsActive) => {
    if (isPointsActive) return 'player-note-cell points-cell active';
    if (activatedCount === 0) return 'player-note-cell points-cell inactive';
    return 'player-note-cell points-cell available';
  };

  const getMusicCellClass = (categoryId, noteIndex, activatedCount, isMelody = false) => {
    const songIdx = noteIndex - 1;
    const isUnlocked = songIdx < activatedCount;
    const noteId = `${categoryId}-${noteIndex}`;
    const isUsed = usedNotes.has(noteId);
    const isSelectedReveal = activeNote?.categoryId === categoryId && activeNote?.noteIndex === noteIndex && activeNote.isReveal;
    const result = progress.results?.[noteId];
    
    if (isSelectedReveal) return 'player-note-cell reveal';
    if (isUsed) {
      if (result === 'correct') return 'player-note-cell correct';
      if (result === 'wrong') return 'player-note-cell wrong';
      return 'player-note-cell used';
    }
    if (isUnlocked) return 'player-note-cell unlocked';
    return 'player-note-cell locked';
  };

  return (
    <div className="player-round-display-container">
      {/* HEADER */}
      <div className="player-round-header">
        <div className="player-round-header-left">
          <div className="player-round-number">
            {roundId}
          </div>
          <div>
            <h1 className="player-round-title">{t.round || 'ROUND'} {roundId}</h1>
            <div className="player-round-subtitle">
              {isMelodyRound ? (t.melodyGuess || 'Melody Guess') : (t.songChallenge || 'Song Challenge')}
            </div>
          </div>
        </div>
        
        {/* Status Info */}
        <div className="player-round-status">
          <div className={`player-audio-status ${isPlaying ? 'playing' : 'stopped'}`}>
            <div className="audio-status-icon">♪</div>
            <span className="audio-status-text">
              {isPlaying 
                ? (activeNote?.isReveal 
                  ? (t.playingAnswer || 'Answer Playing') 
                  : (t.playingSong || 'Song Playing')) 
                : (t.audioStopped || 'Audio Stopped')}
            </span>
          </div>
          
          {activeNote && !activeNote.isReveal && currentRoundPoints && (
            <div className="player-points-status">
              <span className="points-status-value">{currentRoundPoints}</span>
              <span className="points-status-label">{t.points || 'Points'}</span>
            </div>
          )}
        </div>
      </div>
      
      {/* MAIN CONTENT */}
      <div className="player-round-content">
        {/* Left Column - Game Grid */}
        <div className="player-round-game-grid">
          {displayCategories.map(cat => {
            const activatedCount = progress.activationCounts?.[cat.id] || 0;
            const isCategoryFinished = activatedCategories.has(cat.id);
            const isPointsActive = activeNote?.categoryId === cat.id && activeNote?.noteIndex === 0 && !activeNote.isReveal;

            return (
              <div 
                key={cat.id} 
                className={`player-category-row ${activeNote?.categoryId === cat.id ? 'active' : ''} ${isCategoryFinished ? 'finished' : ''}`}
              >
                {/* Category Name */}
                <div className="player-category-name">
                  {language === 'en' ? cat.name.en : cat.name.ru}
                </div>
                
                {/* Notes/Points Grid */}
                <div className={`player-notes-grid ${isMelodyRound ? 'melody' : 'standard'}`}>
                  {isMelodyRound ? (
                    <>
                      {/* Points Cell */}
                      <div className={getPointsCellClass(cat.id, activatedCount, isPointsActive)}>
                        {isPointsActive ? (
                          <span className="points-cell-value">{currentRoundPoints}</span>
                        ) : activatedCount > 0 ? (
                          <span className="points-cell-value">{progress.persistentPoints?.[`${cat.id}-0`] || 0}</span>
                        ) : (
                          <MusicIcon className="note-icon" />
                        )}
                        <div className="note-cell-lives">
                          {4 - activatedCount} L
                        </div>
                      </div>
                      
                      {/* Music Note Cells */}
                      {[1, 2, 3, 4].map((idx) => {
                        const cellClass = getMusicCellClass(cat.id, idx, activatedCount, true);
                        const isSelectedReveal = activeNote?.categoryId === cat.id && activeNote?.noteIndex === idx && activeNote.isReveal;
                        
                        return (
                          <div
                            key={idx}
                            className={cellClass}
                          >
                            {isSelectedReveal ? (
                              <PlayCircle className="note-icon playing" />
                            ) : (
                              <MusicIcon className="note-icon" />
                            )}
                          </div>
                        );
                      })}
                    </>
                  ) : (
                    /* Standard Round (4 notes per category) */
                    [0, 1, 2, 3].map((idx) => {
                      const cellClass = getNoteCellClass(cat.id, idx);
                      const isSelected = activeNote?.categoryId === cat.id && activeNote?.noteIndex === idx && !activeNote.isReveal;
                      const isRevealActive = activeNote?.categoryId === cat.id && activeNote?.noteIndex === idx && activeNote.isReveal;
                      const pts = isSelected ? currentRoundPoints : progress.pointMap?.[cat.id]?.[idx];
                      
                      return (
                        <div 
                          key={idx} 
                          className={cellClass}
                        >
                          {isRevealActive ? (
                            <PlayCircle className="note-icon playing" />
                          ) : pts ? (
                            <span className="points-cell-value">{pts}</span>
                          ) : (
                            <MusicIcon className="note-icon" />
                          )}
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Right Column - Player Scores */}
        <div className="player-round-scores-column">
          {/* Header removed via CSS */}
          
          <div className="player-scores-grid">
            {sortedPlayers.map((player, idx) => {
              const isCurrentPlayer = player.isCurrentPlayer;
              
              let cardClasses = 'player-score-card';
              if (isCurrentPlayer) {
                cardClasses += ' current-player';
              }
              
              return (
                <div 
                  key={player.id || idx} 
                  className={cardClasses}
                >
                  {/* Rank number hidden via CSS */}
                  <div className="player-score-rank" style={{ display: 'none' }}>
                    #{idx + 1}
                  </div>
                  <div className="player-score-info">
                    <div className="player-score-name">
                      {player.name || `${t.playerName || 'Player'} ${player.id + 1}`}
                      {isCurrentPlayer && (
                        <span className="current-player-label">
                          {t.currentTurn || 'CURRENT TURN'}
                        </span>
                      )}
                    </div>
                    <div className="player-score-stats">
                      <div className="player-score-stars">
                        {[1, 2, 3].map(star => (
                          <span 
                            key={star} 
                            className={`star ${star <= (player.stars || 0) ? 'active' : 'inactive'}`}
                          >
                            ★
                          </span>
                        ))}
                      </div>
                      <div className="player-score-points">
                        {player.score || 0} <span className="points-label">{t.points?.toLowerCase() || 'points'}</span>
                      </div>
                    </div>
                  </div>
                  {/* Turn indicator removed via CSS */}
                </div>
              );
            })}
          </div>
          
          {/* Round Progress removed via CSS */}
        </div>
      </div>
    </div>
  );
};

export default PlayerRoundDisplay;