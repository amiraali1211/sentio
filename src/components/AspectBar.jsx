export default function AspectBar({ aspect, score, mentionCount }) { const isPositive = score >= 0
 const barColor = isPositive ? 'bg-positive' : 'bg-negative' 
 const widthPct = Math.abs(score)
  return ( <div className="py-2.5"> <div className="flex items-center justify-between text-sm mb-1"> <span className="font-medium text-ink">{aspect}</span> <span className="text-muted">{mentionCount} mentions</span> </div> <div className="h-2 rounded-full bg-primary-soft relative"> <div className={`h-2 rounded-full ${barColor}`} style={{ width: `${widthPct}%` }} /> </div> </div> ) }