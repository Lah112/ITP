import { makeStyles } from "@material-ui/core/styles";

export const useMainPaperStyles = makeStyles(
  (theme) => ({
    root: {
      width: "100vW",
      display: "flex",
      flexDirection: "column",
      flex: 1,
      minHeight: '100vH',
      borderRadius: 8,
      
       
    },
    homepage: {
      minWidth: "98%",
      marginTop: "0.5em",
      display: "flex",
      [theme.breakpoints.down("md")]: {
        marginTop: "0",
        display: "block",
      },
    },
    postsPanel: {
      minWidth: "40vW",
      flexGrow: 1,
      marginBottom: '50px',
       
    },
    

  }),
  { index: 1 }
);

export const useNavStyles = makeStyles(
  (theme) => ({
    leftPortion: {
      flexGrow: 1,
      display: "flex",
      alignItems: "center",
      [theme.breakpoints.down("xs")]: {
        marginLeft: "1em",
      },
    },
    logoWrapper: {
      marginRight: theme.spacing(10),
      [theme.breakpoints.down("xs")]: {
        marginRight: 0,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start",
      },
    },
    logo: {
      fontFamily: "Varela Round",
      textTransform: "none",
      fontSize: "1.3em",
      padding: "0.1em",
      marginRight: "0.3em",
    },
    user: {
      marginRight: 10,
    },
    titleButton: {
      textTransform: "none",
      fontSize: 20,
      marginRight: 12,
    },
    navButtons: {
      "&:hover": {
        backgroundColor: "#ffe5d8",
      },
    },
    search: {
      flexGrow: 0.75,
      [theme.breakpoints.down("sm")]: {
        flexGrow: 1,
        padding: "0 0.5em",
      },
    },
    searchBtn: {
      padding: "0.2em",
    },
  }),
  { index: 1 }
);

export const useAuthStyles = (authType) =>
  makeStyles(
    (theme) => ({
      authWrapper: {
        display: "flex",
        flexDirection: authType === "login" ? "row" : "row-reverse",
        [theme.breakpoints.down("xs")]: {
          flexDirection: "column",
          marginTop: 10,
        },
      },
      form: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 20,
        [theme.breakpoints.down("xs")]: {
          padding: "0 0 0 0",
        },
      },
      formTitle: {
        textAlign: "center",
        [theme.breakpoints.down("xs")]: {
          fontSize: "1.5em",
        },
      },
      switchText: {
        textAlign: "center",
        marginBottom: "1.2em",
        [theme.breakpoints.down("xs")]: {
          marginBottom: 0,
          fontSize: "1em",
        },
      },
      submitButton: {
        marginTop: "1.8em",
      },
      input: {
        display: "flex",
        alignItems: "flex-end",
      },
      inputIcon: {
        marginRight: 8,
      },
      sidePanel: {
        padding: 20,
        margin: "auto 0",
      },
      divider: {
        marginLeft: 40,
        marginRight: 40,
      },
    }),
    { index: 1 }
  );

export const useDialogStyles = makeStyles(
  (theme) => ({
    dialogWrapper: {
      padding: 0,
      overflow: "hidden",
      [theme.breakpoints.down("xs")]: {
        padding: 0,
      },
    },
    createPostWrapper: {
      display: "flex",
      width: "auto",
      borderRadius: 0,
      marginBottom: 10,
      padding: 6,
      alignItems: "center",
    },
    createBtn: {
      marginLeft: 8,
      textTransform: "none",
      justifyContent: "flex-start",
    },
    fab: {
      position: "fixed",
      bottom: theme.spacing(2),
      right: theme.spacing(2),
      zIndex: 1000,
    },
    iconGroup: {
      display: "flex",
    },
    dialogTitle: {
      fontSize: "1.2em",
    },
    createSubBtn: {
      margin:"10px",
      //maxWidth: "250px",
      minWidth:"150px",
      
     
    },
    defaultAvatar: {
      backgroundColor: theme.palette.secondary.main,
    },
  }),
  { index: 1 }
);

export const useAlertStyles = makeStyles(
  (theme) => ({
    root: {
      width: "100%",
      "& > * + *": {
        marginTop: theme.spacing(2),
      },
      marginTop: "0.8em",
      marginBottom: "0.8em",
    },
  }),
  { index: 1 }
);

export const usePostListStyles = makeStyles(
  (theme) => ({
    root: {
      width: "100%",
      marginBottom: "1em",
    },
    loadBtnWrapper: {
      display: "flex",
      justifyContent: "center",
    },
    loadBtn: {
      marginTop: "0.8em",
      width: "50%",
    },
    noSubscribedPosts: {
      textAlign: "center",
      marginTop: "5em",
    },
    loadSpinner: {
      textAlign: "center",
      marginTop: "12em",
      marginBottom: "6em",
    },
  }),
  { index: 1 }
);

export const useCardStyles = makeStyles(
  (theme) => ({

    Paper: {
      padding: '20px', 
      marginBottom: '50px', 
      display: 'flex', 
      width: '100vW',
      display: 'flex',
      flexDirection: 'column',
      flex: 1,
      minHeight: '100vH',
      position: 'relative',

    },

    gradientLine:{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '1px', // Height of the top border
      background: 'linear-gradient(90deg, rgba(42,42,42,0.05) 5%, rgba(159,159,159,1) 52%, rgba(42,42,42,0.05) 95%)',
      
    },

    root: {
      padding: '20px',
      display: 'flex',
      width: 'auto',
      borderRadius: 0,
      marginBottom: '10px',
      position: 'relative',
      borderRadius: 8,
      '&:hover': {
        opacity: 0.95,
        backgroundImage: `linear-gradient(90deg, rgba(255,255,255,0.001) 10%, ${theme.palette.primary.main2} 52%, rgba(42,42,42,0.0) 90%)`,
        backgroundClip: 'padding-box, border-box',
        
      }, 
      
    },
    votesWrapper: {
      display: 'flex',
      flexDirection: 'column',
      width: 45,
      alignItems: 'center',
      backgroundColor: theme.palette.type === 'light' ? '#f7f5f3' : '#2f271f',
      borderRadius: 30,
    },
    thumbnailWrapper: {
      alignSelf: "center",
      marginLeft: 5,
    },
    thumbnail: {
      fontSize: "2em",
      width: 70,
      height: 90,
      textAlign: "center",
      backgroundColor: theme.palette.type === "light" ? "#f7f5f3" : "#2f271f",
      borderRadius: 8,
      [theme.breakpoints.down("xs")]: {
        width: 60,
        height: 80,
      },
    },
    thumbnailIcon: {
      marginTop: 30,
    },
    postInfoWrapper: {
      padding: 10,
      paddingBottom: 0,
    },
    userAndDate: {
      marginLeft: 10,
    },
    commentsBtn: {
      textTransform: "none",
      color: theme.palette.type === "light" ? "#787878" : "#dadada",
    },
    title: {
      marginRight: 5,
      [theme.breakpoints.down("xs")]: {
        fontSize: "1em",
        margin: 0,
      },
    },
    bottomBtns: {
      display: "flex",
    },
  }),
  { index: 1 }
);

export const usePostFormStyles = makeStyles(
  (theme) => ({
    root: {
      display: "flex",
      flexDirection: "column",
    },
    form: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      paddingLeft: 20,
      paddingRight: 20,
      paddingBottom: 20,
      flexGrow: 1,
      [theme.breakpoints.down("xs")]: {
        padding: "0 0 0 0",
      },
    },
    formTitle: {
      textAlign: "center",
      [theme.breakpoints.down("xs")]: {
        fontSize: "1.5em",
      },
    },
    submitButton: {
      marginTop: "1.8em",
    },
    input: {
      display: "flex",
      alignItems: "flex-end",
      marginTop: "0.7em",
    },
    inputIcon: {
      marginRight: 8,
    },
    inputIconText: {
      padding: 2,
      paddingBottom: 0,
      marginRight: 9,
      fontWeight: 700,
      wordBreak: "keep-all",
    },
    typeBtnGroup: {
      marginBottom: 5,
    },
    imageInput: {
      marginTop: "1em",
    },
    imageBtnsWrapper: {
      display: "flex",
      alignItems: "flex-end",
    },
    imagePreview: {
      display: "flex",
      justifyContent: "center",
      marginTop: "0.7em",
    },
    clearSelectionBtn: {
      padding: "0.25em",
    },
    selectBtn: {
      textTransform: "capitalize",
    },
    textInput: {
      display: "flex",
      alignItems: "flex-end",
      marginTop: "1.5em",
    },
  }),
  { index: 1 }
);

export const usePostCommentsStyles = makeStyles(
  (theme) => ({
    mainPaper: {
      marginTop: '0.5em',
      display: 'flex',
      flexDirection: 'column',
      borderRadius: 5,
      minHeight: '90vH',
    },
    topPortion: {
      display: "flex",
    },
    votesWrapper: {
      display: "flex",
      flexDirection: "column",
      width: 50,
      alignItems: "center",
      justifyContent: "flex-start",
      backgroundColor: theme.palette.type === "light" ? "#f7f5f3" : "#2f271f",
      [theme.breakpoints.down("xs")]: {
        width: 35,
      },
    },
    postDetails: {
      flexGrow: 1,
      display: "flex",
      flexDirection: "column",
      padding: "0.5em",
      borderRadius: 0,
    },
    title: {
      fontWeight: 500,
      marginBottom: "0.7em",
    },
    imagePost: {
      textAlign: "center",
    },
    image: {
      width: "40%",
      [theme.breakpoints.down("xs")]: {
        width: "40%",
      },
      border: "1px solid #e9e3d8",
      borderRadius: 8,
    },
    bottomBar: {
      display: "flex",
      marginTop: "0.8em",
      [theme.breakpoints.down("xs")]: {
        fontSize: "0.9em",
      },
    },
    bottomButton: {
      display: "flex",
      alignItems: "center",
      fontSize: "1em",
    },
    commentIcon: {
      marginRight: 10,
    },
    commentsContainer: {
      marginLeft: "0.7em",
      [theme.breakpoints.down("xs")]: {
        marginLeft: "0.3em",
      },
    },
    divider: {
      marginBottom: "1em",
    },
    wholeComment: {
      marginBottom: "1em",
    },
    commentWrapper: {
      display: "flex",
    },
    commentVotesWrapper: {
      display: "flex",
      flexDirection: "column",
      width: 30,
      alignItems: "center",
      justifyContent: "flex-start",
    },
    commentDetails: {
      display: "flex",
      flexDirection: "column",
      padding: "1em",
      paddingTop: "0.7em",
      width: "100%",
    },
    replyWrapper: {
      marginBottom: "0.2em",
      display: "flex",
      marginLeft: "2em",
    },
    noCommentsBanner: {
      textAlign: "center",
      marginTop: "5em",
    },
    loadSpinner: {
      textAlign: "center",
      marginTop: "12em",
    },
  }),
  { index: 1 }
);

export const useCommentInputStyles = makeStyles(
  (theme) => ({
    wrapper: {
      marginTop: "0.5em",
      margin: "0.4em",
    },
    form: {
      display: "flex",
      flexDirection: "column",
    },
    commentBtn: {
      alignSelf: "flex-end",
      marginTop: "0.1em",
    },
  }),
  { index: 1 }
);

export const useCommentAndBtnsStyles = makeStyles(
  (theme) => ({
    inputDiv: {
      display: "flex",
      flexDirection: "column",
    },
    submitBtns: {
      alignSelf: "flex-end",
      marginTop: "0.1em",
    },
    btnStyle: {
      textTransform: "none",
    },
    btnBar: {
      display: "flex",
    },
    cancelBtn: {
      marginRight: "0.2em",
      marginTop: "0.1em",
    },
  }),
  { index: 1 }
);

export const useUserPageStyles = makeStyles(
  (theme) => ({
    mainPaper: {
      marginTop: '0.5em',
      display: 'flex',
      flexDirection: 'column',
      borderRadius: 5,
      minHeight: '90vH',
      paddingBottom: '1em',
    },
    userInfoWrapper: {
      margin: "0.5em",
      padding: "0.8em",
      display: "flex",
      justifyContent: "space-around",
      [theme.breakpoints.down("xs")]: {
        flexDirection: "column",
      },
    },
    itemWrapper: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "space-between",
    },
    avatarWrapper: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    rightWrapper: {
      flexGrow: 0.3,
      display: "flex",
      justifyContent: "space-between",
    },
    twoItemsDiv: {
      textAlign: "center",
    },
    avatar: {
      width: "5em",
      height: "5em",
      [theme.breakpoints.down("xs")]: {
        width: "3em",
        height: "3em",
      },
    },
    cakeDay: {
      display: "flex",
      alignItems: "center",
    },
    postsPaper: {
      margin: "0.5em",
    },
    loadBtnWrapper: {
      display: "flex",
      justifyContent: "center",
    },
    loadBtn: {
      width: "50%",
    },
    noPosts: {
      textAlign: "center",
      marginTop: "5em",
    },
    loadSpinner: {
      textAlign: "center",
      marginTop: "12em",
    },
  }),
  { index: 1 }
);

export const useUserPostCardStyles = makeStyles(
  (theme) => ({

    Paper: {
      padding: '20px', 
      marginBottom: '50px', 
      display: 'flex', 
      width: '100vW',
      display: 'flex',
      flexDirection: 'column',
      flex: 1,
      minHeight: '100vH',
      position: 'relative',

    },

    gradientLine:{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '1px', // Height of the top border
      background: 'linear-gradient(90deg, rgba(42,42,42,0.05) 5%, rgba(159,159,159,1) 52%, rgba(42,42,42,0.05) 95%)',
      
    },

    root: {
      padding: '20px',
      display: 'flex',
      width: 'auto',
      borderRadius: 0,
      marginBottom: '10px',
      position: 'relative',
      borderRadius: 8,
      '&:hover': {
        opacity: 0.95,
        backgroundImage: `linear-gradient(90deg, rgba(255,255,255,0.001) 10%, ${theme.palette.primary.main2} 52%, rgba(42,42,42,0.0) 90%)`,
        backgroundClip: 'padding-box, border-box',
        
      }, 
      
    },

    mainPaper: {
      display: 'flex',
      marginBottom: '10px',
      textDecoration: 'none',
      '&:hover': {
        border: `1px solid ${theme.palette.primary.main}`,
      },
    },
    votesWrapper: {
      display: "flex",
      flexDirection: "column",
      width: 50,
      alignItems: "center",
      justifyContent: "flex-start",
      [theme.breakpoints.down("xs")]: {
        width: 35,
      },
    },
    title: {
      fontWeight: 500,
      marginBottom: "0.7em",
    },
    imagePost: {
      textAlign: "center",
    },
    image: {
      width: "30%",
      [theme.breakpoints.down("xs")]: {
        width: "40%",
      },
      border: "1px solid #e9e3d8",
      borderRadius: 8,
    },
    postInfo: {
      paddingTop: "0.5em",
      padding: "0.2em",
      display: "flex",
      flexDirection: "column",
      flexGrow: 1,
    },
    commentsBtn: {
      marginTop: "0.5em",
    },
  }),
  { index: 1 }
);

export const useSubPageStyles = makeStyles(
  (theme) => ({
    mainPaper: {
      marginTop: "0.5em",
      display: "flex",
      flexDirection: "column",
      borderRadius: 0,
      minHeight: "90vH",
      paddingBottom: "1em",
    },
    subInfoWrapper: {
      margin: "0.5em",
      padding: "0.8em",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      [theme.breakpoints.down("xs")]: {
        flexDirection: "column",
        justifyContent: "center",
      },
    },
    iconText: {
      display: "flex",
      alignItems: "flex-end",
      [theme.breakpoints.down("xs")]: {
        justifyContent: "center",
      },
    },
    secondPanel: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      [theme.breakpoints.down("xs")]: {
        marginTop: "1em",
      },
    },
    joinBtn: {
      marginBottom: "0.4em",
    },
    description: {
      display: "flex",
      alignItems: "flex-end",
      flexWrap: "wrap",
      margin: "0.3em 0",
      maxWidth: 300,
      [theme.breakpoints.down("xs")]: {
        justifyContent: "center",
      },
    },
    inputDiv: {
      display: "flex",
      flexDirection: "column",
    },
    submitBtns: {
      alignSelf: "flex-end",
      marginTop: "0.1em",
    },
    firstPanel: {
      [theme.breakpoints.down("xs")]: {
        textAlign: "center",
      },
    },
    loadBtnWrapper: {
      display: "flex",
      justifyContent: "center",
    },
    loadBtn: {
      marginTop: "0.8em",
      width: "50%",
    },
    noPosts: {
      textAlign: "center",
      marginTop: "5em",
    },
    loadSpinner: {
      textAlign: "center",
      marginTop: "12em",
    },
  }),
  { index: 1 }
);

export const useSortTabStyles = makeStyles(
  (theme) => ({
    mainPaper: {
      borderRadius: 5,
      marginBottom: '0.6em',
      [theme.breakpoints.down('xs')]: {
        marginBottom: '0em',
      },
    },
    gradientLine:{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '1px', // Height of the top border
      background: 'linear-gradient(90deg, rgba(42,42,42,0.05) 5%, rgba(159,159,159,1) 52%, rgba(42,42,42,0.05) 95%)',
    },

  }),
  { index: 1 }
);

export const useSubPanelStyles = makeStyles(
  (theme) => ({
    mainPaper: {
      minWidth: "25%",
      borderRadius: 0,
      marginLeft: "0.5em",
      padding: "0.5em",
    },
    listPaper: {
      padding: "1em",
    },
    title: {
      textAlign: "center",
      marginBottom: "1em",
    },
    listItem: {
      fontSize: "1.1em",
    },
    listWrapper: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-start",
      marginBottom: "1em",
    },
  }),
  { index: 1 }
);

export const useSubredditFormStyles = makeStyles(
  (theme) => ({
    formWrapper: {
      [theme.breakpoints.down("xs")]: {
        marginTop: 10,
      },
    },
    form: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      paddingLeft: 20,
      paddingRight: 20,
      paddingBottom: 20,
      [theme.breakpoints.down("xs")]: {
        padding: "0 0 0 0",
      },
    },
    formTitle: {
      textAlign: "center",
      [theme.breakpoints.down("xs")]: {
        fontSize: "1.5em",
      },
    },
    submitButton: {
      marginTop: "1.8em",
      marginBottom: "0.5em",
    },
    input: {
      display: "flex",
      alignItems: "flex-end",
    },
    inputIcon: {
      marginRight: 8,
    },
    inputIconText: {
      padding: 2,
      paddingBottom: 0,
      marginRight: 9,
      fontWeight: 700,
      wordBreak: "keep-all",
    },
    descInput: {
      display: "flex",
      alignItems: "flex-end",
      marginTop: "1.5em",
    },
  }),
  { index: 1 }
);

export const useUserMenuStyles = makeStyles(
  (theme) => ({
    userBtn: {
      textTransform: "none",
      display: "flex",
    },
    avatar: {
      width: theme.spacing(4),
      height: theme.spacing(4),
      marginRight: "0.1em",
      backgroundColor: theme.palette.secondary.main,
      [theme.breakpoints.up("xs")]: {
        marginRight: "0.5em",
      },
    },
    userBtnMob: {},
    navItems: {
      display: "flex",
      alignItems: "center",
    },
    karmaWrapper: {
      display: "flex",
      alignItems: "center",
    },
  }),
  { index: 1 }
);

export const useAvatarFormStyles = makeStyles(
  (theme) => ({
    root: {
      marginTop: "1em",
    },
    title: {
      textAlign: "center",
    },
    selectBtn: {
      textTransform: "none",
    },
    clearSelectionBtn: {
      padding: "0.25em",
    },
    imageBtnsWrapper: {
      display: "flex",
      alignItems: "flex-end",
      marginTop: "1em",
    },
    imagePreview: {
      display: "flex",
      justifyContent: "center",
      marginTop: "0.7em",
    },
    submitButton: {
      marginTop: "1.4em",
    },

    input: {
      marginTop: '1.4em',
    },

    currentAvatar: {
      display: "flex",
      justifyContent: "center",
      marginTop: "0.5em",
    },
    currentAvatarText: {
      marginRight: "0.5em",
    },
  }),
  { index: 1 }
);

export const useSearchPageStyles = makeStyles(
  (theme) => ({
    mainPaper: {
      marginTop: "0.5em",
      display: "flex",
      flexDirection: "column",
      borderRadius: 0,
      minHeight: "90vH",
      paddingBottom: "1em",
    },
    infoPaper: {
      padding: "0.8em",
      display: "flex",
      alignItems: "flex-start",
    },
    noResults: {
      textAlign: "center",
      display: "flex",
      flexDirection: "column",
      marginTop: "1em",
    },
    sorryIcon: {
      marginRight: "7px",
      fontSize: "4em",
      display: "flex",
      justifyContent: "center",
      width: "100%",
    },
    loadBtnWrapper: {
      display: "flex",
      justifyContent: "center",
    },
    loadBtn: {
      marginTop: "0.8em",
      width: "50%",
    },
  }),
  { index: 1 }
);

export const useSortCommentsStyles = makeStyles(
  (theme) => ({
    root: {
      display: "flex",
      alignItems: "center",
    },
    label: {
      marginRight: 10,
      display: "flex",
      alignItems: "center",
    },
  }),
  { index: 1 }
);

export const useNotFoundPageStyles = makeStyles(
  (theme) => ({
    mainPaper: {
      marginTop: "0.5em",
      display: "flex",
      flexDirection: "column",
      borderRadius: 0,
      minHeight: "90vH",
      paddingBottom: "1em",
      textAlign: "center",
    },
    textWrapper: {
      marginTop: "20%",
    },
    icon: {
      fontSize: "8em",
      marginBottom: "0.3em",
    },
  }),
  { index: 1 }
);

export const useArticleStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    position: "relative",
    width: "95%",
    height: "100%",
  },
  addArticleBtn: {
    position: "absolute",
    bottom: "30px",
    right: "20px",
    background: "linear-gradient(90deg, #FF8C00, #FF4500)", // Gradient background
    color: "white",
    border: "none",
    padding: "12px 25px",
    borderRadius: "10px",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "background-color 0.3s ease, transform 0.3s ease",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",

    // For mobile
    "@media (max-width: 600px)": {
      bottom: "10px",
      right: "10px",
      padding: "7px",
      borderRadius: "50%",
      fontSize: "10px",
    },
  },
  searchBarContainer: {
    width: "90%",
    display: "flex",
    justifyContent: "end",
    alignItems: "center",
    margin: "20px 0",
  },
  searchBar: {
    width: "300px",

    // For mobile
    "@media (max-width: 600px)": {
      width: "100%",
    },
  },
  articleContainer: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: "20px",
    alignItems: "center",
    maxHeight: "60svh",
    overflowY: "scroll",
    padding: "20px",

    // For mobile
    "@media (max-width: 600px)": {
      padding: "10px",
      maxHeight: "100%",
    },
  },
  articleCard: {
    width: "400px",
    height: "330px",
    borderRadius: "10px",
    padding: "20px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    position: "relative",

    // For mobile
    "@media (max-width: 600px)": {
      width: "100%",
    },
  },
  articleCardOwn: {
    backgroundColor: "#FF4500",
    width: "fit-content",
    padding: "5px 10px",
    color: "white",
    position: "absolute",
    top: "0px",
    right: "0px",
    borderBottomLeftRadius: "10px",
    fontWeight: "bold",
  },
  articleCardTitle: {
    fontSize: "1.5em",
    fontWeight: "bold",
    marginBottom: "10px",
    display: "-webkit-box",
    "-webkit-line-clamp": 2,
    "-webkit-box-orient": "vertical",
    overflow: "hidden",

    // For mobile
    "@media (max-width: 600px)": {
      fontSize: "1em",
    },
  },
  articleCardContentText: {
    display: "-webkit-box",
    "-webkit-line-clamp": 5,
    "-webkit-box-orient": "vertical",
    overflow: "hidden",

    // For mobile
    "@media (max-width: 600px)": {
      fontSize: "0.9em",
    },
  },
  articleTag: {
    padding: "5px 10px",
    borderRadius: "20px",
    border: "1px solid #ccc",

    // For mobile
    "@media (max-width: 600px)": {
      margin: "5px 0",
      fontSize: "0.8em",
    },
  },
  articleCardBtnContainer: {
    position: "absolute",
    bottom: "20px",
    right: "0",
    left: "0",
    display: "flex",
    justifyContent: "space-between",
    width: "90%",
    padding: "0 5%",
  },
  articleCardAuthor: {
    fontSize: "0.9em",
    fontWeight: "bold",
    margin: 0,

    // For mobile
    "@media (max-width: 600px)": {
      fontSize: "0.8em",
    },
  },
  articleCardDate: {
    fontSize: "0.8em",
    color: "#666",
    margin: 0,

    // For mobile
    "@media (max-width: 600px)": {
      fontSize: "0.7em",
    },
  },
  articleCardBtn: {
    padding: "10px 20px",
    backgroundColor: "#FF8C00",
    color: "white",
    border: "none",
    borderRadius: "20px",
    cursor: "pointer",

    // hover effect
    transition: "background-color 0.3s ease",
    "&:hover": {
      backgroundColor: "#FF4500",
      fontWeight: "bold",
    },

    // For mobile
    "@media (max-width: 600px)": {
      padding: "8px 16px",
      fontSize: "0.8em",
    },
  },
});

export const useArticleViewStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "90%",
    padding: "20px",
  },
  middleContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    gap: "20px",
    margin: 0,

    // For mobile
    "@media (max-width: 700px)": {
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    },
  },

  editDeleteBtn: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-end",
  },
  articleViewImg: {
    width: "300px",
    height: "auto",
    marginBottom: "20px",
  },
  articleTag: {
    backgroundColor: "#f9f9f9",
    padding: "5px 10px",
    borderRadius: "20px",
    border: "1px solid #ccc",
    margin: "5px 10px",
  },
  articleViewAuthor: {
    fontSize: "1.1em",
    fontWeight: "bold",
    margin: 0,
    textTransform: "capitalize",
  },
  articleViewDate: {
    fontSize: "1em",
    color: "#666",
    margin: 0,
  },
});

// Article Report page style
export const useArticleReportStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    position: "relative",
    width: "95%",
    height: "100%",
  },

  titleContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: "20px",

    // For mobile
    "@media (max-width: 600px)": {
      flexDirection: "column",
      alignItems: "center",
    },
  },

  detailsContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
  },

  download: {
    textDecoration: "none !important",
    padding: "10px 20px",
    backgroundColor: "#FF8C00",
    color: "white",
    border: "none",
    borderRadius: "20px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    // hover effect
    transition: "background-color 0.3s ease",
    "&:hover": {
      backgroundColor: "#FF4500",
      fontWeight: "bold",
    },
  },
  

});
