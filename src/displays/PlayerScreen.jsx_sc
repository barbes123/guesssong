import React, { useState, useEffect } from 'react';
import { translations } from '../../translations';
import './PlayerScreen.css';
// Import the new component
import PlayerRoundDisplay from './PlayerRoundDisplay';
import VictoryDisplay from './VictoryDisplay';

const PlayerScreen = () => {
  const [gameState, setGameState] = useState(null);
  
  useEffect(() => {
    const interval = setInterval(() => {
      const stored = localStorage.getItem('musicQuizPlayerState');
      if (stored) {
        setGameState(JSON.parse(stored));
      }
    }, 500);
    
    return () => clearInterval(interval);
  }, []);
  
  if (!gameState) {
    return (
      <div className="player-screen player-loading-screen">
        <h1 className="player-loading-title">🎵 {translations.en.title} 🎵</h1>
        <p className="player-loading-text">Waiting for game...</p>
      </div>
    );
  }
  
  const { 
    currentPage, 
    players = [], 
    activeRoundId, 
    roundProgress = {}, 
    language = 'en'
  } = gameState;
  
  const t = translations[language];
  
  // Setup Page Display
  if (currentPage === 'setup') {
    const allPlayersNamed = players.every(p => p.name && p.name.trim() !== '');
    
    return (
      <div className="player-screen player-setup-screen">
        <div className="player-header">
          <h1 className="player-title">{t.playerSetup}</h1>
        </div>
        
        <div className="player-players-list">
          {players.map((player, idx) => (
            <div key={player.id} className="player-item">
              <div className="player-number">{idx + 1}.</div>
              <div className="player-name">
                {player.name || `${t.playerName} ${player.id + 1}`}
              </div>
            </div>
          ))}
          
          {players.length === 0 && (
            <div className="player-empty-state">No players yet</div>
          )}
        </div>
        
        <div className="player-footer">
          {players.length > 0 && allPlayersNamed ? (
            <div className="player-ready-box">
              <div className="player-ready-text">READY TO START</div>
              <div className="player-ready-sub">
                {players.length} {players.length !== 1 ? t.players : t.player} {t.ready}
              </div>
            </div>
          ) : (
            <div className="player-waiting-box">
              <div className="player-waiting-text">WAITING FOR PLAYERS...</div>
            </div>
          )}
        </div>
      </div>
    );
  }
  
  // Start Page Display
  if (currentPage === 'start') {
    const sortedPlayers = [...players].sort((a, b) => {
      const starsA = a.stars || 0;
      const starsB = b.stars || 0;
      if (starsB !== starsA) return starsB - starsA;
      return b.score - a.score;
    });
    
    const completedRounds = [1, 2, 3, 4].map(id => 
      roundProgress[id] ? true : false
    );
    
    return (
      <div className="player-screen player-start-screen">
        <div className="player-header">
          <h1 className="player-title">{t.title}</h1>
          <div className="player-subtitle">{t.chooseRound}</div>
        </div>
        
        <div className="player-content-container">
          {/* Left Column - Rounds */}
          <div className="player-rounds-column">
            <div className="player-rounds-grid">
              {[1, 2, 3, 4].map(roundId => {
                const isActive = activeRoundId === roundId;
                const isCompleted = completedRounds[roundId - 1];
                
                let roundName = '';
                if (roundId === 1) roundName = t.songChallenge;
                if (roundId === 2) roundName = t.melodyGuess;
                if (roundId === 3) roundName = t.categories.superGame;
                if (roundId === 4) roundName = 'SPRINT';
                
                return (
                  <div
                    key={roundId}
                    className={`player-round-card ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}
                  >
                    <div className="player-round-number">
                      {t.round} {roundId}
                    </div>
                    <div className="player-round-name">
                      {roundName}
                    </div>
                    {isCompleted && (
                      <div className="player-completed-badge">✓</div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
          
          {/* Right Column - Players/Scores */}
          <div className="player-scores-column">
            <div className="player-scores-header">
              <div className="player-section-title">{t.scorePanel}</div>
              <div className="player-section-subtitle">Leaderboard</div>
            </div>
            
            <div className="player-scores-grid">
              {sortedPlayers.map((player, idx) => (
                <div 
                  key={player.id} 
                  className={`player-score-card ${idx === 0 ? 'leader' : ''}`}
                >
                  <div className="player-score-rank">#{idx + 1}</div>
                  <div className="player-score-info">
                    <div className="player-score-name">
                      {player.name || `${t.playerName} ${player.id + 1}`}
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
                        {player.score || 0} <span className="points-label">{t.points.toLowerCase()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  // Round Display (Rounds 1 & 2)
  if (currentPage === 'round' && (activeRoundId === 1 || activeRoundId === 2)) {
    return <PlayerRoundDisplay gameState={gameState} t={t} />;
  }

  if (gameState.currentPage === 'victory') {
    return <VictoryDisplay players={gameState.players} t={t} />;
  }
  
  // Default for other pages/rounds
  return (
    <div className="player-screen player-default-screen">
      <h1 className="player-default-title">{t.title}</h1>
      <div className="player-default-status">
        {currentPage === 'round' && `${t.round} ${activeRoundId}`}
        {currentPage && currentPage !== 'setup' && currentPage !== 'start' && 
          currentPage.toUpperCase()}
      </div>
    </div>
  );
};

export default PlayerScreen;