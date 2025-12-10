---
title: Markdown Renderer Feature Showcase
description: A comprehensive test of all markdown rendering capabilities
date: 10-12-2025
time-to-read: 8m
---

## ATX-Style Header 2

This is a paragraph testing the **bold text** feature. Here's some _italic text_ as well. And of course, we can combine them for **_bold and italic_** at the same time!

### ATX-Style Header 3

Let's try different syntax: **bold with underscores** and _italic with underscores_ and **_bold italic with underscores_**.

#### ATX-Style Header 4

Here's some `inline code` within a paragraph. You can also use ~~strikethrough~~ for deleted text.

##### ATX-Style Header 5

Testing links: [Visit Google](https://www.google.com "Google Homepage") with a title, and [GitHub](https://github.com) without a title.

###### ATX-Style Header 6

Auto-linked URLs work too: https://example.com or with angle brackets <https://example.org>

---

## Code Blocks

Here's a fenced code block with a language specified:

```javascript
function greet(name) {
  const message = `Hello, ${name}!`;
  console.log(message);
  return message;
}

greet("World");
```

And another with TypeScript:

```typescript
interface User {
  id: number;
  name: string;
  email: string;
}

const getUser = async (id: number): Promise<User> => {
  const response = await fetch(`/api/users/${id}`);
  return response.json();
};
```

A fenced code block without language:

```
This is plain code
No syntax highlighting here
Just preformatted text
```

Indented code blocks also work:

    function oldSchoolCode() {
      // This is indented with 4 spaces
      return "Hello from indented code!";
    }

---

## Lists

### Unordered Lists

Using dashes:

- First item
- Second item
- Third item with **bold** and _italic_

Using asterisks:

- Apple
- Banana
- Cherry with a [link](https://fruit.com)

Using plus signs:

- Red
- Green
- Blue

### Nested Unordered Lists

- Level 1 item A
  - Level 2 item A1
  - Level 2 item A2
    - Level 3 item A2a
    - Level 3 item A2b
  - Level 2 item A3
- Level 1 item B
- Level 1 item C

### Ordered Lists

1. First step
2. Second step
3. Third step with `inline code`

4. This is a new ordered list
5. With different content
6. And some ~~strikethrough~~

### Nested Ordered Lists

1. Chapter One
   1. Section 1.1
   2. Section 1.2
      1. Subsection 1.2.1
      2. Subsection 1.2.2
2. Chapter Two
3. Chapter Three

### Mixed Lists

- Unordered parent
  1. Ordered child one
  2. Ordered child two
- Another unordered
  - Nested unordered
    1. Deep ordered

---

## Blockquotes

> This is a simple blockquote.
> It spans multiple lines.

> Blockquotes can contain **bold**, _italic_, and `code`.
>
> They can also have multiple paragraphs with an empty quote line between them.

> ### Blockquote with Header
>
> And here's some content after the header.
> With a [link](https://example.com) too!

> > Nested blockquotes work too!
> > This is the inner quote.
>
> Back to the outer quote.

---

## Tables

### Simple Table

| Name    | Age | City     |
| ------- | --- | -------- |
| Alice   | 30  | New York |
| Bob     | 25  | London   |
| Charlie | 35  | Tokyo    |

### Table with Alignment

| Left Aligned | Center Aligned | Right Aligned |
| :----------- | :------------: | ------------: |
| Left text    |  Center text   |    Right text |
| More left    |  More center   |    More right |
| `code`       |    **bold**    |      _italic_ |

### Complex Table

| Feature       | Supported | Example     |
| :------------ | :-------: | :---------- |
| Bold          |     ✓     | **text**    |
| Italic        |     ✓     | _text_      |
| Code          |     ✓     | `code`      |
| Links         |     ✓     | [link](url) |
| Strikethrough |     ✓     | ~~text~~    |

---

## Images

### Image Syntax Reference

Images use the following syntax:

```
![alt text](url)                        - basic image, centered
![alt text](url "title")                - with hover title
![alt text](url =width)                 - with max-width in pixels
![alt text](url =widthxheight)          - with width and height
![alt text](url left)                   - left aligned
![alt text](url center)                 - center aligned (default)
![alt text](url right)                  - right aligned
![alt text](url inline)                 - inline with text, sizes to container
![alt text](url =width alignment)       - with size and alignment
![alt text](url "title" =width align)   - full syntax
```

### Examples

Standard image (natural size, centered by default):

![Coffee](/coffee.png "A delicious cup of coffee")

Image aligned left:

![Doomer](/doomer.png left)

Image aligned right:

![Hard Hat](/hard-hat.png right)

Image with width, centered:

![Subject](/subject.svg =150 center)

Image with width, aligned left:

![Tropical Galaxy](/tropicalgalaxy.png =200 left)

Image with title, width and right alignment:

![Coffee](/coffee.png "Small coffee" =250 right)

### Inline Images

Inline images ![icon](/tropicalgalaxy.png inline) automatically size to match the text they're in.

## Header with inline image ![star](/tropicalgalaxy.png inline) example

> Blockquotes can also have inline images ![icon](/subject.svg inline) that size appropriately.

- List item with an inline image ![check](/tropicalgalaxy.png inline) here
- Another item ![star](/tropicalgalaxy.png inline) with icon

| Column A | Column B with icon ![x](/tropicalgalaxy.png inline) |
| -------- | --------------------------------------------------- |
| Cell 1   | Cell with image ![ok](/tropicalgalaxy.png inline)   |

---

## Horizontal Rules

Three dashes:

---

Three asterisks:

---

Three underscores:

---

---

## Inline Elements Combined

Here's a paragraph with **_all_** the inline elements working together: We have **bold**, _italic_, ~~strikethrough~~, and `inline code`. You can even nest them: **bold with ~~strikethrough~~ inside**. Check out [this link](https://example.com "Example Site") or this auto-link: https://example.org

---

## Edge Cases

### Empty Elements

---

_Test empty bold:_ \*_ \*\* and empty italic: _ \* (these might render oddly)

### Special Characters

Using asterisks without formatting: 2 _ 3 = 6 and 4 _ 5 = 20

Underscores in words: snake_case_variable and another_example_here

### Multiple Line Breaks

This line ends with two spaces for a hard break.  
This is on a new line but same paragraph.  
And another line with a break.

### Long Paragraph

This is a very long paragraph that contains **bold text**, _italic text_, `inline code`, a [hyperlink](https://example.com), and ~~strikethrough text~~. The purpose of this paragraph is to test how all the inline elements work together in a longer block of text. Sometimes you need to emphasize **_multiple things at once_** or combine `code` with **bold code** descriptions. Links can have [descriptive text](https://example.com "With titles too") and images can be inline ![tiny icon](/subject.svg inline) within text.

---

## Final Summary

This document has tested:

1. All six ATX header levels
2. Fenced code blocks with language
3. Fenced code blocks without language
4. Indented code blocks
5. Unordered lists with -, \*, and +
6. Ordered lists with numbers
7. Nested lists (multiple levels)
8. Mixed ordered and unordered lists
9. Simple blockquotes
10. Multi-paragraph blockquotes
11. Nested blockquotes
12. Simple tables
13. Tables with alignment
14. All horizontal rule styles
15. Bold text (\*\* and \_\_)
16. Italic text (\* and \_)
17. Bold+italic text (\*\*\* and \_\_\_)
18. Strikethrough text
19. Inline code
20. Links with and without titles
21. Auto-linked URLs
22. Images with and without titles
23. Images with custom width/height
24. Images with alignment (left/center/right)
25. Inline images that size to their container
26. Hard line breaks

> **Tip:** Use this post as a reference when building new markdown features!
