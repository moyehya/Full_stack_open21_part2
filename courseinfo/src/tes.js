const Parts=({parts})=><ul style={ulstyle}>{parts.map(part=><li key={part.id}>{part.name} {part.exercises}</li>)}</ul>