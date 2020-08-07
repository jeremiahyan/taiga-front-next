# Creating a new component

Create an `Example` component in the commons/components folder.

```bash
ng generate component commons/components/Example --export --changeDetection OnPush
```

This will generate the component files (html, css, ts, spec) and will add the component to the parent module declarations and exports.

Set the component name and selector using the `tg` prefix and remove the unused OnInit function

```ts
@Component({
  selector: 'tg-example',
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TgExampleComponent {

  constructor() { }

}
```
Where possible, we should try to maintain the same element interface as the standard HTML elements. Let's say we create a tgButton, we can expect it to implement a class, type, disabled or aria-label attributes plus any other required Inputs, such as the variant.

As a reminder

- `@Attribute` will read an attribute from the host tag and bind it to a component variable once, on the constructor. This is useful for binding attributes that won't change.
- `@Hostbinding` is the same as @Attribute, but the binding will be listened for changes in the host and updated in the component.

Implement the `:host` selector in the CSS to set the styles of the host container.

Use the `ChangeDetectionStrategy.OnPush` by default meaning that automatic change detection is deactivated. Change detection can still be explicitly invoked.

### Table component

Table components will use the CDK table component: https://material.angular.io/cdk/table
As an example, you will find a basic implementation of a table, for reference under '@app/commons/components/table'

### Modal component

Modals will use the Angular CDK Dialog Component: https://material.angular.io/components/dialog

#### Opening a modal

```ts
this.dialog.open(TgExampleComponent, {
      data: {
        title: 'This a modal!',
        description: 'Bacon ipsum dolor amet venison ham hock pig sirloin. '
      },
      height: '400px',
      width: '600px',
    });
```

The `open` function accepts two parameters:

  * The component to render into the modal, in this case `TgExampleComponent`
  * Optional parameters. The parameters under the data property are similar to component inputs 

See all accepted optional parameters here: https://material.angular.io/components/dialog/api

#### Emiting data from the component

You can subscribe to the component close to send any data you need

```ts
  this.dialogRef.afterClosed().subscribe((result: string) => {
    console.log(`Modal result: ${result}`); // Pizza!
  });
```
And when closing the modal send the data.

```ts
  this.dialogRef.close('Pizza!');
```

So you'll get the console `Modal result: Pizza!`

#### Displaying passed data 

Here you'll see an example of how the inner component that the `material dialog` displays the data.

```ts
import { Component, ChangeDetectionStrategy, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

export interface DialogData {
  title: string;
  description: string;
}

// (...) The @Component decorator

export class TgExampleComponent {

  title: string;
  description: string;

  constructor(
      private dialogRef: MatDialogRef<TgModalComponent>,
      @Inject(MAT_DIALOG_DATA) data: DialogData) {

      // This is the data passed when opening the modal.
      this.title = data.title;
      this.description = data.description;
  }
}
```

## Testing components

For testing we're using [spectator](https://github.com/ngneat/spectator). This is the test of the previous service example.

```ts
import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { TgExampleComponent } from './example.component';

describe('ButtonComponent', () => {
  let spectator: Spectator<TgExampleComponent>;
  const createComponent = createComponentFactory(TgExampleComponent);

  beforeEach(() => spectator = createComponent({
    // The component inputs
    props: {
      name: 'example'
    },
    // Override the component's providers
    providers: [],
    // Whether to run change detection (defaults to true)
    detectChanges: false
  }));

  it('should have a success class by default', () => {
    // This test checks that the input attribute name becomes a class in the component structure
    expect(spectator.query('div')).toHaveClass('example');
  });
});
```

## Responsive

For styling purposes you will find media queries under the styles folder, `responsive.css` file.
When responsive affects Behaviour, we will use the [Layout CDK helper](https://material.angular.io/cdk/layout/overview) 

```ts
/**
 * Copyright (c) 2014-2020 Taiga Agile LLC
 *
 * This source code is licensed under the terms of the
 * GNU Affero General Public License found in the LICENSE file in
 * the root directory of this source tree.
 */

import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';

@Component({
  selector: 'tg-example',
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.css'],
})
export class ExampleComponent implements OnInit {
  constructor(
    public breakpointObserver: BreakpointObserver,
    ) {}

  ngOnInit() {
    this.breakpointObserver
      .observe([Breakpoints.HandsetPortrait])
      .subscribe((state: BreakpointState) => {
        if (result.matches) {
          this.doThingsForHadsetPortrait();
        }
      });
  }
}
```

For specific media queries (avoid if not specifically required by design) you can use [`MediaMatcher`](https://material.angular.io/cdk/layout/overview#mediamatcher)

## Accesibility

As a general rule, for all components we will follow the [basic accesibility principles](https://www.w3.org/WAI/fundamentals/accessibility-principles/):

  * **Text alternatives for non-text content**. All images, icons, charts, labels, forms will have an alternative text if not available
  * We will use **landmarks, headings, and semantic HTML** everywhere to allow users find the content the look for.
  * We will try to detect color problems, such as contrast. 
  * Color should not be the only way to convey information
  * Users should be able to resize up to 200% and see the information _(layout not required)_
  * All functionality that is available by mouse is also available by keyboard
  * Keyboard focus does not get trapped in any part of the content that can only be exited using a mouse or pointing device.
  * The keyboard focus is visible, and the focus order follows a meaningful sequence

Then, in complex component, we can find some examples and tutorials to follow:

  * [Web Accessibility Tutorials](https://www.w3.org/WAI/tutorials/): Very common components tutorial on accesibility.
  * [WAI ARIA Design Patterns and Widgets](https://w3c.github.io/aria-practices/): Displays examples of accesible common components

## Storybook

Create a new `n-componentName.stories.ts` file under the `stories` folder. For example `3-tgExample.stories.ts`

Use knobs to allow the design team to interact with the component and test the inputs and attributes. 

```ts
import { moduleMetadata, storiesOf } from '@storybook/angular';
import { text, boolean, withKnobs, select } from '@storybook/addon-knobs';
import { CommonComponentsModule } from '@/app/commons/components/common-components.module';
import faker from 'faker';

storiesOf('tgExample', module)
  .addDecorator(withKnobs)
  .addDecorator(
    moduleMetadata({
      declarations: [
        TgOtherExampleComponent // Declare any other component required
      ],
      imports: [
        CommonComponentsModule, //Import CommonsModules to access to shared components
      ],
    })
  )
  .add('Example Component', () => {
    const loading = boolean('Loading', false);
    return {
      template: `
        <tg-example [loading]="loading">
          Example text
        </tg-example>
      `,
      props: {
        loading,
      },
    };
  });
```
