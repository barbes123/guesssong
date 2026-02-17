    export const saveScoreSnapshot = (players: any[], roundId: number | null) => {
    const timestamp = new Date().toISOString();
    const logEntry = {
        timestamp,
        roundId,
        scores: players.map(p => ({
        name: p.name || 'Anonymous',
        score: p.score,
        stars: p.stars || 0
        }))
    };

    // Get existing logs or start new array
    const existingLogs = JSON.parse(localStorage.getItem('game_history') || '[]');
    existingLogs.push(logEntry);
    
    // Save back to local storage
    localStorage.setItem('game_history', JSON.stringify(existingLogs));
    };

  export const downloadFinalLog = () => {
  const history = localStorage.getItem('game_history');
  if (!history) return;

  const data = JSON.parse(history);
  
  // Convert JSON into a plain text list for a real .log feel
  const logContent = data.map((e: any) => {
    const players = e.scores.map((s: any) => `${s.name}: ${s.score}`).join(' | ');
    return `[${e.timestamp}] RD ${e.roundId} -> ${players}`;
  }).join('\n');

  // Use 'text/plain' to make it a standard text file
  const blob = new Blob([logContent], { type: 'text/plain' });
  
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  
  // FORCE the name to games.log
  link.download = "games.log"; 
  
  link.click();
  localStorage.removeItem('game_history');
};