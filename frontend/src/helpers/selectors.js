
export function getPostsForUser(state, user) {
  const filteredByPosition = state.posts.find(post => post.address <= user.location);
  if (filteredByPosition === undefined || filteredByPosition === 0) {
    return [] // I'm so sorry component.
  } else {
    const detailedListing = filteredByPosition.posts.map(id => state.post[id])
    return detailedListing
  }
}

// export function getInterviewersForDay(state, day) {
//   if (!state.interviewers) return [];
//   const filteredDay = state.days.filter(dia => dia.name === day)[0];
//   if (!filteredDay) return [];
//   if (!filteredDay.interviewers) return [];
//   const detailedDay = Object.values(state.interviewers).filter(interviewer => filteredDay.interviewers.includes(interviewer.id))
//   return detailedDay

// }

// export function getInterview(state, interview) {
//   if (!interview) {
//     return null
//   }
//   return { ...interview, interviewer: state.interviewers[interview.interviewer] };
// }
