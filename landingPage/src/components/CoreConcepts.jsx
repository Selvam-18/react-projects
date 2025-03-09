export default function CoreConcepts({img, description, title}) {
    return(
      <li>
        <img src={img} alt={img} />
        <h3>{title}</h3>
        <p>{description}</p>
      </li>
    );
  }