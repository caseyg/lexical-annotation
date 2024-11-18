function CommentsPanelListComment({
  comment,
  deleteComment,
  thread,
  rtf,
}: {
  comment: Comment;
  deleteComment: (commentOrThread: Comment | Thread, thread?: Thread) => void;
  rtf: Intl.RelativeTimeFormat;
  thread?: Thread;
}): JSX.Element {
  return (
    <li className="CommentPlugin_CommentsPanel_List_Comment">
      <div className="CommentPlugin_CommentsPanel_List_Details">
        <span className="CommentPlugin_CommentsPanel_List_Comment_Author">
          {comment.author}
        </span>
        <span className="CommentPlugin_CommentsPanel_List_Comment_Time">
          · {getRelativeTimeString(comment.timeStamp, rtf)}
        </span>
      </div>
      <p className={comment.deleted ? 'CommentPlugin_CommentsPanel_DeletedComment' : ''}>
        {comment.content}
      </p>
      {comment.tags && comment.tags.length > 0 && (
        <div className="CommentPlugin_CommentsPanel_List_Tags">
          {comment.tags.map((tag) => (
            <span key={tag.value} className="CommentPlugin_CommentsPanel_List_Tag">
              {tag.label}
            </span>
          ))}
        </div>
      )}
      {/* ... rest of the component ... */}
    </li>
  );
} 